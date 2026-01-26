'use server';
/**
 * @fileOverview A billing assistant AI agent that can navigate and perform calculations.
 *
 * - billingAssistant - A function that handles the billing conversation process.
 * - Conversation - The type for the conversation history.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import {ConversationSchema, type Conversation} from './billing-assistant-types';
import {allProductCategoriesWithServices, type ProductWithServices, type Service} from '@/lib/all-products-with-services';

const navigateTo = ai.defineTool(
  {
    name: 'navigateTo',
    description: 'Navigate to a specific page in the application.',
    inputSchema: z.object({
      path: z.string().describe('The path to navigate to (e.g., /billing/add-bill).'),
    }),
    outputSchema: z.void(),
  },
  async () => {}
);

const calculateBill = ai.defineTool(
  {
    name: 'calculateBill',
    description: "Calculates the total bill based on a list of items and their services. This tool should be used after confirming all items with the user.",
    inputSchema: z.object({
        items: z.array(z.object({
            product: z.string().describe("The full name of the product as found in the product list, e.g., 'Shirt - Cotton'"),
            service: z.string().describe("The name of the service, e.g., 'Premium Laundry'"),
            quantity: z.number().describe("The quantity of the item.")
        })).describe("An array of items to be billed.")
    }),
    outputSchema: z.object({
        subtotal: z.number(),
        gst: z.number(),
        total: z.number(),
    }),
  },
  async ({ items }) => {
      let subtotal = 0;

      for (const item of items) {
          let foundPrice: number | null = null;
          
          for (const category of allProductCategoriesWithServices) {
              const product = category.products.find(p => p.name === item.product);
              if (product) {
                  const service = product.services.find(s => s.name === item.service);
                  if (service) {
                      foundPrice = service.price;
                      break;
                  }
              }
          }

          if (foundPrice !== null) {
              subtotal += foundPrice * item.quantity;
          } else {
              // Handle case where product/service not found, maybe return an error or a default price
              // For now, we just skip it in the calculation
              console.warn(`Price for ${item.product} with service ${item.service} not found.`);
          }
      }

      const gst = subtotal * 0.18;
      const total = subtotal + gst;
      
      return {
          subtotal: parseFloat(subtotal.toFixed(2)),
          gst: parseFloat(gst.toFixed(2)),
          total: parseFloat(total.toFixed(2)),
      };
  }
);


const systemPrompt = `You are Lax, a friendly and highly capable AI assistant for Dr. Dry Wash, a laundry service company. Your primary role is to assist users with their queries and billing tasks.

Your capabilities include:
1.  **Answering Questions**: You can answer general questions about Dr. Dry Wash's services, pricing, and policies. Your knowledge is based on the website's content.
2.  **Navigation**: You can navigate users to different pages of the website. If a user asks to "go to billing" or "create an invoice", use the \`navigateTo\` tool with the path \`/billing/add-bill\`.
3.  **Billing Assistance**: When on the billing page, you can guide users through creating an invoice conversationally.
    - Ask for the customer's name, phone number, and address.
    - Ask for the items, including the service, the specific garment, and quantity. (e.g., "Wash and Iron for 5 shirts").
    - You MUST understand and parse different items and services. Refer to the available products and services to find the correct names. For example, if a user says "cotton shirt", you should map it to "Shirt - Cotton".
    - After gathering all items, you MUST confirm the complete list with the user.
    - Once confirmed, use the \`calculateBill\` tool to get the subtotal, GST, and grand total.
    - Present the final bill to the user clearly.
4.  **Handling Complaints**: If a user wants to raise a complaint, acknowledge their issue, generate a random 6-digit support ticket ID, and inform them that the support team will get in touch.

Always maintain a friendly, patient, and helpful tone. Remember you are "Lax".`;

const billingAssistantFlow = ai.defineFlow(
  {
    name: 'billingAssistantFlow',
    inputSchema: ConversationSchema,
    outputSchema: z.string(),
    system: systemPrompt,
    tools: [navigateTo, calculateBill],
  },
  async (history) => {
    const result = await ai.generate({
        history,
    });
    return JSON.stringify(result.output());
  }
);

export async function billingAssistant(history: Conversation): Promise<string> {
    return billingAssistantFlow(history);
}

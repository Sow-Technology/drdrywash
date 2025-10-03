'use server';
/**
 * @fileOverview A conversational AI flow for the Dr. Dry Wash billing assistant.
 *
 * billingAssistant - The main entry point for the conversational agent.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { Conversation, ConversationSchema } from './billing-assistant-types';
import { allProductCategoriesWithServices } from '@/lib/all-products-with-services';

// Tool: Navigate to a specific page
const navigateTo = ai.defineTool(
  {
    name: 'navigateTo',
    description: 'Navigates the user to a specific page within the application.',
    inputSchema: z.object({
      path: z.string().describe("The path to navigate to (e.g., '/billing/add-bill')."),
    }),
    outputSchema: z.void(),
  },
  async () => {
    // This function is a placeholder for the client-side implementation.
    // The client will intercept this tool call and perform the navigation.
  }
);

// Tool: Calculate the bill total
const calculateBill = ai.defineTool(
    {
        name: 'calculateBill',
        description: 'Calculates the subtotal, GST, and grand total for a list of laundry items.',
        inputSchema: z.object({
            items: z.array(z.object({
                service: z.string().describe("The service requested (e.g., 'Dry Clean', 'Premium Laundry')."),
                item: z.string().describe("The clothing item (e.g., 'Shirt', 'Saree - Silk')."),
                quantity: z.number().describe("The number of items."),
            })),
        }),
        outputSchema: z.object({
            subtotal: z.number(),
            gst: z.number(),
            total: z.number(),
        }),
    },
    async ({ items }) => {
        let subtotal = 0;

        for (const orderItem of items) {
            let itemFound = false;
            for (const category of allProductCategoriesWithServices) {
                const product = category.products.find(p => p.name.toLowerCase().includes(orderItem.item.toLowerCase()));
                if (product) {
                    const service = product.services.find(s => s.name.toLowerCase() === orderItem.service.toLowerCase());
                    if (service) {
                        subtotal += service.price * orderItem.quantity;
                        itemFound = true;
                        break;
                    }
                }
            }
            if (!itemFound) {
                // If a specific item isn't found, you could add default pricing or handle it as an error
                // For now, we'll add a default price as a fallback
                subtotal += 50 * orderItem.quantity; 
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

// Define the main prompt for the billing assistant
const billingAssistantPrompt = ai.definePrompt({
  name: 'billingAssistantPrompt',
  system: `You are Lax, a friendly and expert AI assistant for Dr. Dry Wash, a laundry and dry cleaning service.
Your primary role is to assist with the in-store billing process and answer questions about the company's services.

## Core Capabilities:
1.  **Conversational Billing**: When a user says "do billing" or "go to billing", you MUST use the \`navigateTo\` tool with the path '/billing/add-bill'. Once navigation is confirmed, you must guide them step-by-step to create a new bill.
2.  **Q&A**: Answer general questions about Dr. Dry Wash services, pricing, and policies based on your knowledge of the website.
3.  **Bill Calculation**: Use the \`calculateBill\` tool to calculate the final price after collecting all items.

## Conversational Billing - Step-by-Step Guide:
When the user wants to create a bill, follow this exact sequence. Ask one question at a time and wait for the user's response before proceeding.

1.  **Customer Name**: "What is the customer's name?"
2.  **Phone Number**: "What is their phone number?"
3.  **Customer Address**: "And what is the customer's address?"
4.  **Service & Clothes**: "Great. Now, let's add the items. What is the first service and item? (e.g., 'Dry Clean for 2 silk sarees' or 'Wash and Iron for 5 shirts'). You can tell me all the items at once if you like."
5.  **Confirmation**: After the user lists all items, repeat them back for confirmation. For example: "Okay, let me confirm: I have [Item 1], [Item 2], and [Item 3]. Is that correct?"
6.  **Pricing & Finalizing**: Once the user confirms the items, you MUST use the \`calculateBill\` tool to get the total. Then, state the final price clearly to the user: "Got it. The total amount is ₹[Total], which includes a subtotal of ₹[Subtotal] and GST of ₹[GST]. Anything else I can help with?"

- Be polite, conversational, and clear in your instructions.
- Acknowledge user responses with phrases like "Got it," "Okay," or "Great."
- When calling the \`calculateBill\` tool, be diligent in extracting the service, item, and quantity from the user's input. For example, 'Wash and Iron for 5 shirts' should be parsed into: { service: 'Wash and Iron', item: 'Shirt', quantity: 5 }. The item name should be as specific as possible to match the pricing data.
`,
  tools: [navigateTo, calculateBill],
});

const billingAssistantFlow = ai.defineFlow(
  {
    name: 'billingAssistantFlow',
    inputSchema: ConversationSchema,
    outputSchema: z.string(),
  },
  async (history) => {
    const result = await ai.generate({
      model: 'googleai/gemini-pro',
      prompt: { history },
      tools: [navigateTo, calculateBill],
      system: billingAssistantPrompt.system,
      config: {
        temperature: 0.3,
      },
    });

    return JSON.stringify(result.output());
  }
);


export async function billingAssistant(history: Conversation): Promise<string> {
    return billingAssistantFlow(history);
}

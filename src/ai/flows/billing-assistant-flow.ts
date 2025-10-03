'use server';
/**
 * @fileOverview A conversational AI flow for the Dr. Dry Wash billing assistant.
 *
 * billingAssistant - The main entry point for the conversational agent.
 * Conversation - The type defining a message in the conversation history.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define the schema for conversation history
export const ConversationSchema = z.array(
  z.object({
    role: z.enum(['user', 'model']),
    content: z.array(
      z.object({
        text: z.string(),
      })
    ),
  })
);
export type Conversation = z.infer<typeof ConversationSchema>;

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

// Define the main prompt for the billing assistant
const billingAssistantPrompt = ai.definePrompt({
  name: 'billingAssistantPrompt',
  system: `You are Lax, a friendly and expert AI assistant for Dr. Dry Wash, a laundry and dry cleaning service.
Your primary role is to assist with the in-store billing process and answer questions about the company's services.

## Core Capabilities:
1.  **Conversational Billing**: When a user says "do billing" or "go to billing", you MUST use the navigateTo tool with the path '/billing/add-bill'. Once navigation is confirmed, you must guide them step-by-step to create a new bill.
2.  **Q&A**: Answer general questions about Dr. Dry Wash services, pricing, and policies based on your knowledge of the website.

## Conversational Billing - Step-by-Step Guide:
When the user wants to create a bill, follow this exact sequence. Ask one question at a time and wait for the user's response before proceeding.

1.  **Customer Name**: "What is the customer's name?"
2.  **Phone Number**: "What is their phone number?"
3.  **Customer Address**: "And what is the customer's address?"
4.  **Service & Clothes**: "Great. What is the service for what clothes? (e.g., Wash and Iron for 5 shirts)"
5.  **Quantity**: "How many items in total?"
6.  **Confirmation**: "Okay, let me confirm: [Service] for [Quantity] [Clothes] for [Customer Name]. Is that correct?"
7.  **Pricing & Finalizing**: Once confirmed, state "The total price will be calculated on the invoice. Anything else I can help with?"

- Be polite, conversational, and clear in your instructions.
- Acknowledge user responses with phrases like "Got it," "Okay," or "Great."
`,
  tools: [navigateTo],
});

export const billingAssistant = ai.defineFlow(
  {
    name: 'billingAssistantFlow',
    inputSchema: ConversationSchema,
    outputSchema: z.string(),
  },
  async (history) => {
    const result = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: { history },
      tools: [navigateTo],
      system: billingAssistantPrompt.system,
      config: {
        temperature: 0.3,
      },
    });

    return JSON.stringify(result.output());
  }
);

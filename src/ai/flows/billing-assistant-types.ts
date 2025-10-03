import { z } from 'zod';

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

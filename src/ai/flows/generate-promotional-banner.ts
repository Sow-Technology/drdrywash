// This is a server-side file.
'use server';

/**
 * @fileOverview AI-powered promotional banner generator.
 *
 * generatePromotionalBanner - A function that generates promotional banners based on specified laundry service, discount, and target audience.
 * GeneratePromotionalBannerInput - The input type for the generatePromotionalBanner function.
 * GeneratePromotionalBannerOutput - The return type for the generatePromotionalBanner function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePromotionalBannerInputSchema = z.object({
  laundryServiceType: z
    .string()
    .describe('The type of laundry service to promote (e.g., wash & fold, dry cleaning, ironing).'),
  discountPercentage: z
    .number()
    .describe('The discount percentage to offer in the banner (e.g., 10, 20, 25).'),
  targetAudience: z
    .string()
    .describe('The target audience for the promotion (e.g., students, busy professionals, families).'),
});

export type GeneratePromotionalBannerInput = z.infer<typeof GeneratePromotionalBannerInputSchema>;

const GeneratePromotionalBannerOutputSchema = z.object({
  bannerText: z.string().describe('The generated text for the promotional banner.'),
  imageUrl: z.string().describe('The URL of the generated promotional banner image.'),
});

export type GeneratePromotionalBannerOutput = z.infer<typeof GeneratePromotionalBannerOutputSchema>;

export async function generatePromotionalBanner(
  input: GeneratePromotionalBannerInput
): Promise<GeneratePromotionalBannerOutput> {
  return generatePromotionalBannerFlow(input);
}

const generatePromotionalBannerPrompt = ai.definePrompt({
  name: 'generatePromotionalBannerPrompt',
  input: {schema: GeneratePromotionalBannerInputSchema},
  output: {schema: GeneratePromotionalBannerOutputSchema},
  prompt: `You are a marketing expert specializing in creating promotional banners for laundry services.

You will use the provided information to generate compelling banner text and create an image URL for the banner.

Laundry Service Type: {{{laundryServiceType}}}
Discount Percentage: {{{discountPercentage}}}%
Target Audience: {{{targetAudience}}}

Create catchy banner text that highlights the service, discount, and appeals to the target audience. Also generate an image URL.
`,
});

const generatePromotionalBannerFlow = ai.defineFlow(
  {
    name: 'generatePromotionalBannerFlow',
    inputSchema: GeneratePromotionalBannerInputSchema,
    outputSchema: GeneratePromotionalBannerOutputSchema,
  },
  async input => {
    const bannerTextResult = await generatePromotionalBannerPrompt(input);
    // Generate image based on banner text
    const imageDescription = `Create a promotional banner for ${input.laundryServiceType} with a ${input.discountPercentage}% discount for ${input.targetAudience}. The banner text is: ${bannerTextResult.output!.bannerText}`;

    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: imageDescription,
    });

    return {
      bannerText: bannerTextResult.output!.bannerText,
      imageUrl: media.url,
    };
  }
);

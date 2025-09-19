import PromoGeneratorForm from "@/components/promo/promo-generator-form";

export default function PromoGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">Promotional Banner Generator</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Create eye-catching promotional banners for your marketing campaigns using the power of AI.
        </p>
      </div>
      <PromoGeneratorForm />
    </div>
  );
}

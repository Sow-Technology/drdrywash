import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { howItWorksSteps } from "@/lib/data";

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">How It Works</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Getting fresh, clean clothes has never been easier. Follow our simple four-step process.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorksSteps.map((step, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-xl">{step.title}</CardTitle>
                <CardDescription className="pt-2">{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

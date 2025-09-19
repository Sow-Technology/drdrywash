import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { whyChooseUsItems } from "@/lib/data";

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">Why Choose Us?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Experience the Dr. Dry Wash difference. We're more than just a laundry service.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
          {whyChooseUsItems.map((item, index) => (
            <Card key={index} className="text-center border-t-4 border-t-primary pt-6 transform hover:-translate-y-2 transition-transform duration-300">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                <CardDescription className="pt-2">{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

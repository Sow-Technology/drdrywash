import ContactForm from "@/components/contact/contact-form";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export default function ContactPage() {
  const contactImage = PlaceHolderImages.find(img => img.id === 'contact-us');

  return (
    <div className="container py-12 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">Get in Touch</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We're here to help with any questions, concerns, or feedback you may have.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <ContactForm />
        <div className="hidden lg:block">
            {contactImage && (
                <Image
                    src={contactImage.imageUrl}
                    alt={contactImage.description}
                    data-ai-hint={contactImage.imageHint}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                />
            )}
        </div>
      </div>
    </div>
  );
}

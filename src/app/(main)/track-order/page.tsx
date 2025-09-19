import TrackOrderForm from "@/components/tracking/track-order-form";

export default function TrackOrderPage() {
  return (
    <div className="container py-12 md:py-20">
       <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">Order Status</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Enter your order ID below to see real-time updates on your laundry.
        </p>
      </div>
      <TrackOrderForm />
    </div>
  );
}

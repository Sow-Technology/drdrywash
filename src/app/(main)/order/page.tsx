import OrderForm from "@/components/order/order-form";

export default function OrderPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">Place Your Order</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Let's get your laundry sorted. Follow the steps below to schedule your pickup.
        </p>
      </div>
      <OrderForm />
    </div>
  );
}

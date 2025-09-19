import SchedulePickupForm from "@/components/schedule-pickup/schedule-pickup-form";

export default function SchedulePickupPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">Schedule a Pickup</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Ready for a laundry-free life? Fill out the form below to schedule a convenient pickup time.
        </p>
      </div>
      <SchedulePickupForm />
    </div>
  );
}

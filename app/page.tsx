import Header from "@/components/Header";
import EventGrid from "@/components/EventGrid";
import Footer from "@/components/Footer";
import { getEvents } from "@/lib/event-service";
import {
  getNativeEvents,
  convertNativeEventToEvent,
} from "@/lib/native-events";

export default async function Home() {
  // Fetch events from API with fallback to mock data
  const apiEvents = await getEvents();

  // Get native events and convert them to the standard Event interface
  const nativeEvents = getNativeEvents().map(convertNativeEventToEvent);

  // Combine both types of events
  const events = [...apiEvents, ...nativeEvents];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <Header />

      <main className="flex flex-col items-center py-16">
        {/* Search Section */}
        {/* <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <SearchBar placeholder="Search events..." disabled={true} />
          </div>
        </section> */}

        {/* Events Section */}
        <section className="w-full">
          {events.length > 0 ? (
            <EventGrid events={events} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No events found. Please try again later.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

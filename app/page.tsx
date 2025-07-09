import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import EventGrid from "@/components/EventGrid";
import Footer from "@/components/Footer";
import { getCachedEvents } from "@/lib/event-utils";

export default async function Home() {
  // Fetch events using cached utility function with fallback to mock data
  const events = await getCachedEvents();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <Header
        title="Unified Tech Events"
        subtitle="All crypto & AI events, in one place."
      />

      <main className="flex flex-col items-center">
        {/* Search Section */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <SearchBar placeholder="Search events..." disabled={true} />
          </div>
        </section>

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

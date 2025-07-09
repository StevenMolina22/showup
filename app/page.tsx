import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import EventGrid from "@/components/EventGrid";
import Footer from "@/components/Footer";
import { mockEvents } from "@/lib/mock-data";

export default function Home() {
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
          <EventGrid events={mockEvents} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

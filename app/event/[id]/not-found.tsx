import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Event Not Found"
        subtitle="The event you're looking for doesn't exist"
        showBackButton={true}
        backButtonText="Back to Events"
        backButtonHref="/"
        maxWidth="4xl"
      />

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Card className="max-w-md mx-auto animate-fade-in">
            <CardContent className="p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Event Not Found
              </h1>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Sorry, we couldn&apos;t find the event you&apos;re looking for.
                It may have been removed or the link might be incorrect.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
                >
                  <Link href="/">Browse All Events</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50 transition-all duration-200"
                >
                  <Link href="/">Go Back Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

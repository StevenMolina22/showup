import Link from 'next/link';
import { ArrowLeft, Calendar, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Events</span>
            </Link>
            <div className="flex items-center gap-2 ml-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Tech Events</span>
            </div>
          </div>
        </div>
      </header>

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
                Sorry, we couldn&apos;t find the event you&apos;re looking for. It may have been removed or the link might be incorrect.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
                >
                  <Link href="/">
                    Browse All Events
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50 transition-all duration-200"
                >
                  <Link href="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Go Back Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Unified Tech Events</span> – simplifying crypto and AI event discovery.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { Calendar } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center sm:justify-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import { Calendar, ArrowLeft, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
  actionButton?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
    variant?: "default" | "outline";
  };
  maxWidth?: "4xl" | "7xl";
}

export default function Header({
  title = "Attend-Sure",
  subtitle = "Blockchain RSVP events with staking - discover, stake, attend, get rewarded.",
  showBackButton = false,
  backButtonText = "Back",
  backButtonHref = "/",
  actionButton,
  maxWidth = "7xl",
}: HeaderProps) {
  const maxWidthClass = maxWidth === "4xl" ? "max-w-4xl" : "max-w-7xl";

  return (
    <header className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className={`${maxWidthClass} mx-auto px-4 sm:px-6 lg:px-8 py-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <Link
                href={backButtonHref}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">{backButtonText}</span>
              </Link>
            )}

            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg"
              >
                <Calendar className="w-5 h-5 text-white" />
              </Link>
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

          <div className="flex items-center gap-3">
            {actionButton && (
              <Link href={actionButton.href}>
                <Button
                  variant={actionButton.variant || "default"}
                  className={
                    actionButton.variant === "outline"
                      ? "flex items-center gap-2"
                      : "bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                  }
                >
                  {actionButton.icon}
                  <span className="hidden sm:inline">{actionButton.text}</span>
                </Button>
              </Link>
            )}

            {!showBackButton && !actionButton && (
              <Link href="/manage">
                <Button variant="outline" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Manage Events</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import { ReactNode } from "react";
import Navigation from "./Navigation";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
}

export default function DashboardLayout({
  children,
  title,
  subtitle,
  actions,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Header */}
      {(title || subtitle || actions) && (
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                {title && (
                  <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
                )}
                {subtitle && <p className="text-slate-600 mt-1">{subtitle}</p>}
              </div>
              {actions && (
                <div className="flex items-center space-x-3">{actions}</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

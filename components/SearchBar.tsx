"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  disabled?: boolean;
}

export default function SearchBar({
  placeholder = "Search events...",
  onSearch,
  disabled = false,
}: SearchBarProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    onSearch?.(query);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          onChange={handleSearch}
          disabled={disabled}
          className="pl-10 pr-4 py-2 w-full bg-white border-gray-200 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-500"
        />
      </div>
      {disabled && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          Search functionality coming soon
        </p>
      )}
    </div>
  );
}

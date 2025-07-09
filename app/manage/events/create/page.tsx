"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Calendar, MapPin, Users, DollarSign } from "lucide-react";
import { createNativeEvent, type NativeEvent } from "@/lib/native-events";
import Header from "@/components/Header";

export default function CreateEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startAt: "",
    endAt: "",
    timezone: "America/New_York",
    location: "",
    fullAddress: "",
    city: "",
    image: "",
    maxAttendees: "",
    stakeAmount: "",
    organizerName: "",
    organizerEmail: "",
    organizerAvatar: "",
    isActive: true,
  });

  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  // Predefined tag suggestions
  const tagSuggestions = [
    "crypto",
    "defi",
    "nft",
    "blockchain",
    "ethereum",
    "bitcoin",
    "ai",
    "ml",
    "web3",
    "dao",
    "startup",
    "networking",
    "workshop",
    "conference",
    "meetup",
    "hackathon",
    "education",
    "investment",
  ];

  const timezones = [
    "America/New_York",
    "America/Los_Angeles",
    "America/Chicago",
    "America/Denver",
    "Europe/London",
    "Europe/Paris",
    "Europe/Berlin",
    "Asia/Tokyo",
    "Asia/Singapore",
    "Australia/Sydney",
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags((prev) => [...prev, trimmedTag]);
    }
    setNewTag("");
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(newTag);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.title.trim()) newErrors.title = "Event title is required";
    if (!formData.description.trim())
      newErrors.description = "Event description is required";
    if (!formData.startAt)
      newErrors.startAt = "Start date and time is required";
    if (!formData.endAt) newErrors.endAt = "End date and time is required";
    if (!formData.location.trim())
      newErrors.location = "Event location is required";
    if (!formData.organizerName.trim())
      newErrors.organizerName = "Organizer name is required";
    if (!formData.organizerEmail.trim())
      newErrors.organizerEmail = "Organizer email is required";

    // Date validation
    if (formData.startAt && formData.endAt) {
      const startDate = new Date(formData.startAt);
      const endDate = new Date(formData.endAt);
      const now = new Date();

      if (startDate < now) {
        newErrors.startAt = "Start date cannot be in the past";
      }
      if (endDate <= startDate) {
        newErrors.endAt = "End date must be after start date";
      }
    }

    // Email validation
    if (
      formData.organizerEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.organizerEmail)
    ) {
      newErrors.organizerEmail = "Please enter a valid email address";
    }

    // Numeric validations
    if (
      formData.maxAttendees &&
      (isNaN(Number(formData.maxAttendees)) ||
        Number(formData.maxAttendees) < 1)
    ) {
      newErrors.maxAttendees = "Max attendees must be a positive number";
    }

    if (
      formData.stakeAmount &&
      (isNaN(Number(formData.stakeAmount)) || Number(formData.stakeAmount) < 0)
    ) {
      newErrors.stakeAmount = "Stake amount must be a non-negative number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the event
      const eventData: Omit<NativeEvent, "id" | "createdAt" | "updatedAt"> = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        startAt: new Date(formData.startAt).toISOString(),
        endAt: new Date(formData.endAt).toISOString(),
        timezone: formData.timezone,
        location: formData.location.trim(),
        fullAddress: formData.fullAddress.trim() || undefined,
        city: formData.city.trim() || undefined,
        image: formData.image.trim() || undefined,
        tags,
        maxAttendees: formData.maxAttendees
          ? Number(formData.maxAttendees)
          : undefined,
        stakeAmount: formData.stakeAmount
          ? Number(formData.stakeAmount)
          : undefined,
        organizer: {
          name: formData.organizerName.trim(),
          email: formData.organizerEmail.trim(),
          avatar: formData.organizerAvatar.trim() || undefined,
        },
        isActive: formData.isActive,
      };

      const newEvent = createNativeEvent(eventData);

      // Redirect to the event management page
      router.push(`/manage/events/${newEvent.id}`);
    } catch (error) {
      console.error("Failed to create event:", error);
      alert("Failed to create event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        title="Create New Event"
        subtitle="Set up a new blockchain RSVP event with staking"
        showBackButton={true}
        backButtonText="Back to Manage"
        backButtonHref="/manage"
        maxWidth="4xl"
      />

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g., Crypto Startup Pitch Night"
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-sm text-red-600 mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Event Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Describe your event, what attendees can expect, and why they should join..."
                  rows={4}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startAt">Start Date & Time *</Label>
                  <Input
                    id="startAt"
                    type="datetime-local"
                    value={formData.startAt}
                    onChange={(e) =>
                      handleInputChange("startAt", e.target.value)
                    }
                    className={errors.startAt ? "border-red-500" : ""}
                  />
                  {errors.startAt && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.startAt}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="endAt">End Date & Time *</Label>
                  <Input
                    id="endAt"
                    type="datetime-local"
                    value={formData.endAt}
                    onChange={(e) => handleInputChange("endAt", e.target.value)}
                    className={errors.endAt ? "border-red-500" : ""}
                  />
                  {errors.endAt && (
                    <p className="text-sm text-red-600 mt-1">{errors.endAt}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <select
                  id="timezone"
                  value={formData.timezone}
                  onChange={(e) =>
                    handleInputChange("timezone", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {timezones.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="image">Event Image URL (optional)</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                  placeholder="https://example.com/event-image.jpg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Location Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="location">Venue Name *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  placeholder="e.g., Innovation Hub NYC"
                  className={errors.location ? "border-red-500" : ""}
                />
                {errors.location && (
                  <p className="text-sm text-red-600 mt-1">{errors.location}</p>
                )}
              </div>

              <div>
                <Label htmlFor="fullAddress">Full Address (optional)</Label>
                <Input
                  id="fullAddress"
                  value={formData.fullAddress}
                  onChange={(e) =>
                    handleInputChange("fullAddress", e.target.value)
                  }
                  placeholder="123 Tech Street, New York, NY 10001"
                />
              </div>

              <div>
                <Label htmlFor="city">City (optional)</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="New York"
                />
              </div>
            </CardContent>
          </Card>

          {/* Event Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Event Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="maxAttendees">Max Attendees (optional)</Label>
                  <Input
                    id="maxAttendees"
                    type="number"
                    min="1"
                    value={formData.maxAttendees}
                    onChange={(e) =>
                      handleInputChange("maxAttendees", e.target.value)
                    }
                    placeholder="e.g., 150"
                    className={errors.maxAttendees ? "border-red-500" : ""}
                  />
                  {errors.maxAttendees && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.maxAttendees}
                    </p>
                  )}
                  <p className="text-sm text-slate-600 mt-1">
                    Leave empty for unlimited attendees
                  </p>
                </div>

                <div>
                  <Label htmlFor="stakeAmount">
                    Stake Amount in ETH (optional)
                  </Label>
                  <Input
                    id="stakeAmount"
                    type="number"
                    min="0"
                    step="0.001"
                    value={formData.stakeAmount}
                    onChange={(e) =>
                      handleInputChange("stakeAmount", e.target.value)
                    }
                    placeholder="e.g., 0.01"
                    className={errors.stakeAmount ? "border-red-500" : ""}
                  />
                  {errors.stakeAmount && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.stakeAmount}
                    </p>
                  )}
                  <p className="text-sm text-slate-600 mt-1">
                    Amount attendees stake to RSVP
                  </p>
                </div>
              </div>

              <div>
                <Label>Event Tags</Label>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:bg-slate-300 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Add a tag..."
                      className="max-w-xs"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addTag(newTag)}
                      disabled={!newTag.trim()}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-slate-600">Suggestions:</span>
                    {tagSuggestions
                      .filter((suggestion) => !tags.includes(suggestion))
                      .slice(0, 6)
                      .map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => addTag(suggestion)}
                          className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded-full transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Organizer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Organizer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="organizerName">Organizer Name *</Label>
                  <Input
                    id="organizerName"
                    value={formData.organizerName}
                    onChange={(e) =>
                      handleInputChange("organizerName", e.target.value)
                    }
                    placeholder="Your full name"
                    className={errors.organizerName ? "border-red-500" : ""}
                  />
                  {errors.organizerName && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.organizerName}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="organizerEmail">Organizer Email *</Label>
                  <Input
                    id="organizerEmail"
                    type="email"
                    value={formData.organizerEmail}
                    onChange={(e) =>
                      handleInputChange("organizerEmail", e.target.value)
                    }
                    placeholder="your@email.com"
                    className={errors.organizerEmail ? "border-red-500" : ""}
                  />
                  {errors.organizerEmail && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.organizerEmail}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="organizerAvatar">
                  Organizer Avatar URL (optional)
                </Label>
                <Input
                  id="organizerAvatar"
                  value={formData.organizerAvatar}
                  onChange={(e) =>
                    handleInputChange("organizerAvatar", e.target.value)
                  }
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="isActive"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    handleInputChange("isActive", e.target.checked)
                  }
                  className="rounded border-slate-300"
                />
                <Label htmlFor="isActive">
                  Event is active and visible to attendees
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link href="/manage">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? "Creating..." : "Create Event"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

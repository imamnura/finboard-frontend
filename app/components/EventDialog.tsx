"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, X } from "lucide-react";
import { Event } from "@/lib/types";
import Image from "next/image";

interface EventDialogProps {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventDialog({ event, open, onOpenChange }: EventDialogProps) {
  if (!event) return null;

  const addToGoogleCalendar = () => {
    const startDate = new Date(event.date);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration

    const formatDateForGoogle = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, "");
    };

    const googleCalendarUrl = new URL(
      "https://calendar.google.com/calendar/render"
    );
    googleCalendarUrl.searchParams.set("action", "TEMPLATE");
    googleCalendarUrl.searchParams.set("text", event.title);
    googleCalendarUrl.searchParams.set("details", event.description);
    googleCalendarUrl.searchParams.set("location", event.location);
    googleCalendarUrl.searchParams.set(
      "dates",
      `${formatDateForGoogle(startDate)}/${formatDateForGoogle(endDate)}`
    );

    window.open(googleCalendarUrl.toString(), "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold pr-8">
            {event.title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Event details and registration
          </DialogDescription>
        </DialogHeader>

        {/* Event Image */}
        <div className="relative aspect-video w-full rounded-lg overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Event Category */}
        <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium w-fit">
          {event.category}
        </div>

        {/* Event Description */}
        <p className="text-muted-foreground leading-relaxed">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-3 border-t border-border pt-4">
          <div className="flex items-start space-x-3">
            <Calendar className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">Date</p>
              <p className="text-sm text-muted-foreground">
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">Time</p>
              <p className="text-sm text-muted-foreground">{event.time}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">Location</p>
              <p className="text-sm text-muted-foreground">{event.location}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button className="flex-1" size="lg">
            Reserve Your Spot
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={addToGoogleCalendar}
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
            </svg>
            Add to Google Calendar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

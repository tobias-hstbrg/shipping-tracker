import type { ShipmentStatus, Location } from "@/types/shipment";
import {
  ShieldAlert,
  Truck,
  Van,
  ClipboardCopy,
  PackageCheck,
  ShieldQuestionMark,
} from "lucide-react";

interface TimelineProps {
  events: Array<{
    timestamp: Date;
    location: Location;
    statusCode: ShipmentStatus;
    status: string;
    description?: string;
  }>;
}

function getStatusIcon(statusCode: ShipmentStatus) {
  switch (statusCode) {
    case "INFORMATION_RECEIVED":
      return ClipboardCopy;
    case "IN_TRANSIT":
      return Truck;
    case "OUT_FOR_DELIVERY":
      return Van;
    case "DELIVERED":
      return PackageCheck;
    case "EXCEPTION":
      return ShieldAlert;
    case "UNKNOWN":
    default:
      return ShieldQuestionMark;
  }
}

export default function Timeline(props: TimelineProps) {
  return (
    <div className="max-w-(--breakpoint-sm) mx-auto py-4 md:py-6 px-6">
      <div className="relative ml-4">
        {/* Timeline line */}
        <div className="absolute left-0 inset-y-0 border-l-2" />

        {[...props.events]
          .sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )
          .map(
            (
              { timestamp, statusCode, location, description, status },
              index
            ) => {
              const Icon = getStatusIcon(statusCode);
              return (
                <div key={index} className="relative pl-10 pb-12 last:pb-0">
                  {/* Timeline Icon */}
                  <div className="absolute left-px -translate-x-1/2 h-9 w-9 flex items-center justify-center rounded-full bg-accent ring-8 ring-background">
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <div className="pt-2 sm:pt-1 space-y-3">
                    <p className="text-base font-medium">
                      {location.city}, {location.countryCode}
                    </p>
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.01em]">
                        {status.toString()}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 text-sm">
                        <span>{new Date(timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                    {description && (
                      <p className="text-sm sm:text-base text-muted-foreground text-pretty">
                        {description}
                      </p>
                    )}
                  </div>
                </div>
              );
            }
          )}
      </div>
    </div>
  );
}

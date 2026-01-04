package io.github.tobiashstbrg.shippingtracker.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShipmentInfo {
    private String trackingNumber;
    private String carrier;
    private ShipmentStatus status;
    private Location origin;
    private Location destination;
    private Location currentLocation;
    private Instant estimatedDelivery;
    private List<TrackingEvent> events;
}

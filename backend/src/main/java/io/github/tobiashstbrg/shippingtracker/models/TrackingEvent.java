package io.github.tobiashstbrg.shippingtracker.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrackingEvent {
    private Instant timestamp;
    private Location location;
    private ShipmentStatus statusCode;
    private String status;
    private String description;

}

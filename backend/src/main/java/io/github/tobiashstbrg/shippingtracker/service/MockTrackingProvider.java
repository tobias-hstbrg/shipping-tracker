package io.github.tobiashstbrg.shippingtracker.service;

import io.github.tobiashstbrg.shippingtracker.models.Location;
import io.github.tobiashstbrg.shippingtracker.models.ShipmentInfo;
import io.github.tobiashstbrg.shippingtracker.models.ShipmentStatus;
import io.github.tobiashstbrg.shippingtracker.models.TrackingEvent;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class MockTrackingProvider  implements TrackingProvider{
    private final Map<String, ShipmentInfo> mockData;

    public MockTrackingProvider() {
        mockData = new HashMap<>();
        initializeMockData();
    }

    @Override
    public ShipmentInfo getShipmentInfo(String trackingNumber)
        throws ShipmentNotFoundException {
        ShipmentInfo shipmentInfo = mockData.get(trackingNumber);
            if(shipmentInfo != null) {
                return shipmentInfo;
            }
            throw new ShipmentNotFoundException(trackingNumber);
    }

    private void initializeMockData() {
        ShipmentInfo track001 = buildShipmentInfo(
                "TRACK001",
                "DHL",
                ShipmentStatus.IN_TRANSIT,
                createLocation("Berlin", "DE", "10115", 52.52, 13.405),
                Optional.of(createLocation("New Haven", "US", "06510", 41.3083, -72.9279)),
                createLocation("Frankfurt", "DE", "60311", 50.1109, 8.6821),
                createLocation("Paris", "FR", "75001", 48.8566, 2.3522),
                createLocation("New York", "US", "10001", 40.7128, -74.0060)
        );

        ShipmentInfo track002 = buildShipmentInfo(
                "TRACK002",
                "UPS",
                ShipmentStatus.DELIVERED,
                createLocation("London", "GB", "EC1A", 51.5074, -0.1278),
                Optional.of(createLocation("Paris", "FR", "75001", 48.8566, 2.3522)),
                createLocation("Calais", "FR", "62100", 50.9513, 1.8587)
        );

        ShipmentInfo track003 = buildShipmentInfo(
                "TRACK003",
                "FedEx",
                ShipmentStatus.OUT_FOR_DELIVERY,
                createLocation("New York", "US", "10001", 40.7128, -74.0060),
                Optional.of(createLocation("London", "GB", "EC1A", 51.5074, -0.1278)),
                createLocation("Memphis", "US", "38116", 35.0424, -89.9767),
                createLocation("Heathrow", "GB", "TW6", 51.4700, -0.4543)
        );

        ShipmentInfo track004 = buildShipmentInfo(
                "TRACK004",
                "DHL",
                ShipmentStatus.DELIVERED,
                createLocation("Berlin", "DE", "10115", 52.52, 13.405),
                Optional.of(createLocation("New York", "US", "10001", 40.7128, -74.006)),
                createLocation("Frankfurt", "DE", "60311", 50.1109, 8.6821),
                createLocation("Paris", "FR", "75001", 48.8566, 2.3522)
        );

        mockData.put("TRACK001", track001);
        mockData.put("TRACK002", track002);
        mockData.put("TRACK003", track003);
        mockData.put("TRACK004" ,track004);
    }

    private ShipmentInfo createShippingRoute(String trackingNumber,
                                             String carrier,
                                             ShipmentStatus status,
                                             Location origin,
                                             Optional<Location> destination,
                                             List<TrackingEvent> events) {

        // Validation
        Objects.requireNonNull(trackingNumber, "Tracking number must be provided");
        Objects.requireNonNull(carrier, "Carrier must be provided");
        Objects.requireNonNull(status, "Shipment status must be provided");
        Objects.requireNonNull(origin, "A Shipments origin must be provided");
        Objects.requireNonNull(events, "A List of shipping events must be provided");

        // Build with required fields
        var builder = ShipmentInfo.builder()
                .trackingNumber(trackingNumber)
                .carrier(carrier)
                .status(status)
                .origin(origin)
                .events(events);

        // Add optional destination if present
        destination.ifPresent(builder::destination);

        return builder.build();
    }

    private ShipmentInfo buildShipmentInfo(String trackingNumber,
                                           String carrier,
                                           ShipmentStatus currentStatus,
                                           Location origin,
                                           Optional<Location> destination,
                                           Location... waypoints) {

        // Build complete location chain
        List<Location> allLocations = new ArrayList<>();
        allLocations.add(origin);
        allLocations.addAll(Arrays.asList(waypoints));
        destination.ifPresent(allLocations::add);

        // Create events from locations
        List<TrackingEvent> events = createEventChain(
                allLocations.toArray(new Location[0])
        );

        // Build shipment info
        return createShippingRoute(
                trackingNumber,
                carrier,
                currentStatus,
                origin,
                destination,
                events
        );
    }

    private Location createLocation(String city, String countryCode,
                                    String postalCode, double lat, double lng) {
        return Location.builder()
                .city(city)
                .countryCode(countryCode)
                .postalCode(postalCode)
                .latitude(lat)
                .longitude(lng)
                .build();
    }

    private List<TrackingEvent> createEventChain(Location... locations) {
        List<TrackingEvent> events = new ArrayList<>();

        for (int i = 0; i < locations.length; i++) {
            events.add(TrackingEvent.builder()
                    .timestamp(Date.from(Instant.now().minus(locations.length - i, ChronoUnit.DAYS)).toInstant())
                    .location(locations[i])
                    .statusCode(determineStatus(i, locations.length))
                    .status(determineStatusText(i, locations.length))
                    .description(determineDescription(i, locations.length))
                    .build());
        }

        return events;
    }

    private ShipmentStatus determineStatus(int index, int total) {
        if (index == 0) return ShipmentStatus.INFORMATION_RECEIVED;
        if (index == total - 1) return ShipmentStatus.DELIVERED;
        return ShipmentStatus.IN_TRANSIT;
    }

    private String determineStatusText(int index, int total) {
        if (index == 0) return "Label Created";
        if (index == total - 1) return "Delivered";
        return "In Transit";
    }

    private String determineDescription(int index, int total) {
        if (index == 0) return "Shipment information received";
        if (index == total - 1) return "Package delivered to recipient";
        return "Package in transit";
    }
}

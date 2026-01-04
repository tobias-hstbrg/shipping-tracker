package io.github.tobiashstbrg.shippingtracker.service;

import io.github.tobiashstbrg.shippingtracker.models.Location;
import io.github.tobiashstbrg.shippingtracker.models.ShipmentInfo;
import io.github.tobiashstbrg.shippingtracker.models.ShipmentStatus;
import io.github.tobiashstbrg.shippingtracker.models.TrackingEvent;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        Location berlin = Location.builder()
                .city("Berlin")
                .countryCode("DE")
                .postalCode("10115")
                .latitude(52.52)
                .longitude(13.405)
                .build();

        Location london = Location.builder()
                .city("London")
                .countryCode("GB")
                .postalCode("SW1A 1AA")
                .latitude(51.5074)
                .longitude(-0.1278)
                .build();

        Location paris = Location.builder()
                .city("Paris")
                .countryCode("FR")
                .postalCode("75001")
                .latitude(48.8566)
                .longitude(2.3522)
                .build();

        Location newYork = Location.builder()
                .city("New York")
                .countryCode("US")
                .postalCode("10001")
                .latitude(40.7128)
                .longitude(-74.0060)
                .build();


        mockData.put("TRACK001", createInTransitShipment(berlin, newYork));
        mockData.put("TRACK002", createDeliveredShipment(london, paris));
        mockData.put("TRACK003", createOutForDeliveryShipment(newYork, london));
    }

    private ShipmentInfo createInTransitShipment(Location origin, Location destination) {
        // Zwischenstopp für currentLocation
        Location currentLocation = Location.builder()
                .city("Frankfurt")
                .countryCode("DE")
                .postalCode("60311")
                .latitude(50.1109)
                .longitude(8.6821)
                .build();

        // Events erstellen
        TrackingEvent event1 = TrackingEvent.builder()
                .timestamp(Instant.now().minusSeconds(86400 * 2)) // vor 2 Tagen
                .statusCode(ShipmentStatus.INFORMATION_RECEIVED)
                .status("LABEL CREATED")
                .location(origin)
                .build();

        TrackingEvent event2 = TrackingEvent.builder()
                .timestamp(Instant.now().minusSeconds(86400)) // vor 1 Tag
                .statusCode(ShipmentStatus.IN_TRANSIT)
                .status("PACKAGE IN TRANSIT")
                .location(currentLocation)
                .build();

        return ShipmentInfo.builder()
                .trackingNumber("TRACK001")
                .carrier("DHL")
                .status(ShipmentStatus.IN_TRANSIT)
                .origin(origin)
                .destination(destination)
                .currentLocation(currentLocation)
                .estimatedDelivery(Instant.now().plusSeconds(86400)) // morgen
                .events(List.of(event1, event2))
                .build();
    }

    private ShipmentInfo createDeliveredShipment(Location origin, Location destination) {
        TrackingEvent event1 = TrackingEvent.builder()
                .timestamp(Instant.now().minusSeconds(86400 * 3))
                .statusCode(ShipmentStatus.INFORMATION_RECEIVED)
                .status("LABEL CREATED")
                .location(origin)
                .build();

        TrackingEvent event2 = TrackingEvent.builder()
                .timestamp(Instant.now().minusSeconds(86400 * 2))
                .statusCode(ShipmentStatus.IN_TRANSIT)
                .status("IN TRANSIT")
                .location(origin)
                .build();

        TrackingEvent event3 = TrackingEvent.builder()
                .timestamp(Instant.now().minusSeconds(3600))
                .statusCode(ShipmentStatus.DELIVERED)
                .status("DELIVERED")
                .location(destination)
                .description("Package delivered to recipient")
                .build();

        return ShipmentInfo.builder()
                .trackingNumber("TRACK002")
                .carrier("DHL")
                .status(ShipmentStatus.DELIVERED)
                .origin(origin)
                .destination(destination)
                .currentLocation(destination)
                .events(List.of(event1, event2, event3))
                .build();
    }

    private ShipmentInfo createOutForDeliveryShipment(Location origin, Location destination) {
        TrackingEvent event1 = TrackingEvent.builder()
                .timestamp(Instant.now().minusSeconds(86400 * 3))
                .statusCode(ShipmentStatus.INFORMATION_RECEIVED)
                .status("LABEL CREATED")
                .location(origin)
                .build();

        TrackingEvent event2 = TrackingEvent.builder()
                .timestamp(Instant.now().minusSeconds(86400 * 2))
                .statusCode(ShipmentStatus.IN_TRANSIT)
                .status("IN TRANSIT")
                .location(origin)
                .build();

        TrackingEvent event3 = TrackingEvent.builder()
                .timestamp(Instant.now().minusSeconds(3600))
                .statusCode(ShipmentStatus.OUT_FOR_DELIVERY)
                .status("OUT FOR DELIVERY")
                .location(destination)
                .description("Package in delivery vehicle")
                .build();

        return ShipmentInfo.builder()
                .trackingNumber("TRACK003")
                .carrier("DHL")
                .status(ShipmentStatus.OUT_FOR_DELIVERY)
                .origin(origin)
                .destination(destination)
                .currentLocation(destination)
                .events(List.of(event1, event2, event3))
                .build();
    }
}

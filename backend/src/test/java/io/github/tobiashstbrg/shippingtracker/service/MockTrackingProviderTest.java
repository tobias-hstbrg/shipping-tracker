package io.github.tobiashstbrg.shippingtracker.service;

import io.github.tobiashstbrg.shippingtracker.models.ShipmentInfo;
import io.github.tobiashstbrg.shippingtracker.models.ShipmentStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class MockTrackingProviderTest {

    private MockTrackingProvider provider;
    @BeforeEach
    void setUp() {
        provider = new MockTrackingProvider();
    }

    @Test
    void shouldReturnShipmentForTrack001() {
        final String trackingNumber = "TRACK001";

        ShipmentInfo result = provider.getShipmentInfo(trackingNumber);

        assertNotNull(result);
        assertEquals(trackingNumber, result.getTrackingNumber());
        assertEquals("DHL", result.getCarrier());
        assertNotNull(result.getStatus());
        assertEquals(ShipmentStatus.IN_TRANSIT, result.getStatus());
        assertNotNull(result.getOrigin());
        assertNotNull(result.getDestination());
        assertFalse(result.getEvents().isEmpty());
    }

    @Test
    void shouldThrowExceptionForInvalidTrackingNumber() {
        final String trackingNumber = "INVALID999";

        assertThrows(ShipmentNotFoundException.class, () -> provider.getShipmentInfo(trackingNumber) );
    }
}

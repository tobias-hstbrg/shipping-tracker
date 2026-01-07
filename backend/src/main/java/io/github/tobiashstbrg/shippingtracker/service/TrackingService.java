package io.github.tobiashstbrg.shippingtracker.service;

import io.github.tobiashstbrg.shippingtracker.models.ShipmentInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class TrackingService {
    private final TrackingProvider trackingProvider;

    public TrackingService(TrackingProvider trackingProvider) {
        this.trackingProvider = trackingProvider;
    }
    public ShipmentInfo trackShipment(String trackingNumber) throws ShipmentNotFoundException {
        log.debug("Fetching shipment info for: {}", trackingNumber);
        ShipmentInfo info = trackingProvider.getShipmentInfo(trackingNumber);
        log.debug("Successfully retrieved shipment: {}", trackingNumber);
        return info;
    }
}

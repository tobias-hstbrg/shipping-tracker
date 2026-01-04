package io.github.tobiashstbrg.shippingtracker.service;

import io.github.tobiashstbrg.shippingtracker.models.ShipmentInfo;

public class TrackingService {
    private final TrackingProvider trackingProvider;

    public TrackingService(TrackingProvider trackingProvider) {
        this.trackingProvider = trackingProvider;
    }

    public ShipmentInfo trackShipment(String trackingNumber) throws ShipmentNotFoundException {
        return trackingProvider.getShipmentInfo(trackingNumber);
    }
}

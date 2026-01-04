package io.github.tobiashstbrg.shippingtracker.service;

import io.github.tobiashstbrg.shippingtracker.models.ShipmentInfo;

public interface TrackingProvider {
    ShipmentInfo getShipmentInfo(String trackingNumber)
        throws ShipmentNotFoundException;
}
package io.github.tobiashstbrg.shippingtracker.service;

public class ShipmentNotFoundException extends RuntimeException {
    public ShipmentNotFoundException(String trackingNumber) {
        super("Shipment not found: " + trackingNumber);
    }
}

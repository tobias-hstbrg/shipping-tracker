package io.github.tobiashstbrg.shippingtracker.service;

import io.github.tobiashstbrg.shippingtracker.models.ShipmentInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class DHLTrackingProvider implements TrackingProvider{
    @Override
    public ShipmentInfo getShipmentInfo(String trackingNumber) {
        log.info("DHL API called for tracking number: {}", trackingNumber);

        // TODO: Implement actual DHL API call
        throw new UnsupportedOperationException(
                "DHL API integration not yet implemented. Please use mock mode."
        );
    }
}

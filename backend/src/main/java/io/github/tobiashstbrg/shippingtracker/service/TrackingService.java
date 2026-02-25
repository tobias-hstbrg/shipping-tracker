package io.github.tobiashstbrg.shippingtracker.service;

import io.github.tobiashstbrg.shippingtracker.models.ShipmentInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class TrackingService {
    private final TrackingProvider mockProvider;
    private final SettingsService settingsService;
    private final DHLTrackingProvider dhlTrackingProvider;

    public ShipmentInfo trackShipment(String trackingNumber) throws ShipmentNotFoundException {
        log.debug("Fetching shipment info for: {}", trackingNumber);

        // Set provider
        TrackingProvider provider = settingsService.isMockMode() ? mockProvider : dhlTrackingProvider;

        log.info("Using provider {}", provider.getClass().getSimpleName());

        ShipmentInfo info = provider.getShipmentInfo(trackingNumber);

        log.debug("Successfully retrieved shipment: {}", trackingNumber);
        return info;
    }
}

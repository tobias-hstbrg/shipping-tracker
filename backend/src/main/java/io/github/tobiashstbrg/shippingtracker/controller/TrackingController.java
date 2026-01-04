package io.github.tobiashstbrg.shippingtracker.controller;

import io.github.tobiashstbrg.shippingtracker.models.ShipmentInfo;
import io.github.tobiashstbrg.shippingtracker.service.TrackingService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(("/api/shipments"))
public class TrackingController {
    private final TrackingService trackingService;

    public TrackingController(TrackingService service) {
        this.trackingService = service;
    }

    @GetMapping("/{trackingNumber}")
    public ShipmentInfo getShipment(@PathVariable String trackingNumber) {
        return trackingService.trackShipment(trackingNumber);
    }
}

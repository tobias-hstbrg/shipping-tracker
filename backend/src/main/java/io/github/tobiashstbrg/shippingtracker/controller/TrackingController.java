package io.github.tobiashstbrg.shippingtracker.controller;

import io.github.tobiashstbrg.shippingtracker.models.ShipmentInfo;
import io.github.tobiashstbrg.shippingtracker.service.TrackingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.constraints.*;

@Slf4j
@RestController
@RequestMapping(("/api/shipments"))
@Validated
public class TrackingController {
    private final TrackingService trackingService;

    public TrackingController(TrackingService service) {
        this.trackingService = service;
    }

    @GetMapping("/{trackingNumber}")
    public ShipmentInfo getShipment(
            @PathVariable
            @NotBlank(message = "Tracking number cannot be blank!")
            @Size(min = 5, max = 50, message = "Tracking number must be between 5 and 50 characters")
            @Pattern(regexp = "^[A-Z0-9]+$", message = "Tracking number must contain only uppercase letters and numbers")
            String trackingNumber) {
        log.info("Received tracking request for: {}", trackingNumber);
        return trackingService.trackShipment(trackingNumber);
    }
}

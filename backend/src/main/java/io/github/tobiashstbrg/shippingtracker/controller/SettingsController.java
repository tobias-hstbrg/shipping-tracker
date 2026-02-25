package io.github.tobiashstbrg.shippingtracker.controller;
import io.github.tobiashstbrg.shippingtracker.dto.SettingsRequest;
import io.github.tobiashstbrg.shippingtracker.service.SettingsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = {"http://localhost:5173, http://localhost:3000"})
@RequiredArgsConstructor
@Slf4j
public class SettingsController {
    private final SettingsService settingsService;

    @PostMapping
    public ResponseEntity<Map<String,String>> updateSettings(@Valid @RequestBody SettingsRequest request) {
        log.info("Received settings update: mockMode={}", request.getMockMode());

        settingsService.updateSettings(request.getMockMode(), request.getDhlApiKey());

        return ResponseEntity.ok(Map.of(
                "message", "Settings updated successfully",
                "mockMode", String.valueOf(settingsService.isMockMode())
        ));
    }

     @GetMapping
    public ResponseEntity<Map<String, Object>> getSettings() {
        return ResponseEntity.ok(Map.of(
                "mockMode", settingsService.isMockMode(),
                "dhlConfigured", settingsService.isDhlConfigured()
        ));
     }
}

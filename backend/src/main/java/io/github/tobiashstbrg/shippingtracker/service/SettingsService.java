package io.github.tobiashstbrg.shippingtracker.service;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@Getter
public class SettingsService {
    private boolean mockMode = true;
    private String dhlApiKey = null;

    public void updateSettings(boolean mockMode, String dhlApiKey) {
        this.mockMode = mockMode;
        this.dhlApiKey = mockMode ? null : dhlApiKey;

        log.info("Settings updated: mockMode={}, dhlApiSet={}",
                mockMode, dhlApiKey != null && !dhlApiKey.isEmpty());
    }

    public boolean isDhlConfigured() {
        return !mockMode && dhlApiKey != null && !dhlApiKey.isEmpty();
    }
}

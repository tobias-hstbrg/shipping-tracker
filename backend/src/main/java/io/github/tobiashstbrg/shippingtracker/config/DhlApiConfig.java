package io.github.tobiashstbrg.shippingtracker.config;

import io.github.tobiashstbrg.shippingtracker.service.SettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
@RequiredArgsConstructor
public class DhlApiConfig {

    private final SettingsService settingsService;

    @Bean
    public WebClient dhlWebClient() {
        return WebClient.builder()
                .baseUrl("https://api-eu.dhl.com/track/shipments")
                .build();
    }
}

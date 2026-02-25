package io.github.tobiashstbrg.shippingtracker.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SettingsRequest {
    @NotNull
    private Boolean mockMode;

    private String dhlApiKey;
}

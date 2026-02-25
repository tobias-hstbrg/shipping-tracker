package io.github.tobiashstbrg.shippingtracker.dto.dhl;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class DhlEvent {
    private String timestamp;
    private DhlLocation location;
    private DhlStatus statusCode;
    private String description;
}

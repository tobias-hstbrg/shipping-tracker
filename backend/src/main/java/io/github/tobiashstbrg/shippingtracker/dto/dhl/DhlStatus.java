package io.github.tobiashstbrg.shippingtracker.dto.dhl;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class DhlStatus {
    private String statusCode;
    private String status;
    private String description;
}

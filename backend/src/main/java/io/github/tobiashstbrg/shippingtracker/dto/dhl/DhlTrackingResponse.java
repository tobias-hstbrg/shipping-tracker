package io.github.tobiashstbrg.shippingtracker.dto.dhl;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class DhlTrackingResponse {
    private List<DhlShipment> shipments;
}

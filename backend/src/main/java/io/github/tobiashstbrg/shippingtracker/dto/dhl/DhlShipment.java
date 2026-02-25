package io.github.tobiashstbrg.shippingtracker.dto.dhl;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class DhlShipment {
    // tracking number
    private String id;
    private DhlService service;
    private DhlStatus status;
    private DhlDetails details;
    private List<DhlEvent> events;
}

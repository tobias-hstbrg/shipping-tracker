package io.github.tobiashstbrg.shippingtracker.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Optional;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Location {
    private String city;
    private String countryCode;
    private String postalCode;
    private Double latitude;
    private Double longitude;
}

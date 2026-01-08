package io.github.tobiashstbrg.shippingtracker.controller;

import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class TrackingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldReturnShipmentWehenValidTrackingNumber() throws Exception {
        mockMvc.perform(get("/api/shipments/TRACK001"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.trackingNumber").value("TRACK001"));
    }

    @Test
    void shouldReturn404WhenShipmentNotFound() throws Exception {
        mockMvc.perform(get("/api/shipments/INVALID999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").value("Not Found"));
    }

    @Test
    void shouldReturn400WhenTrackingNumberTooShort() throws Exception {
        mockMvc.perform(get("/api/shipments/AB"))
                .andExpect(status().isBadRequest());
    }
}

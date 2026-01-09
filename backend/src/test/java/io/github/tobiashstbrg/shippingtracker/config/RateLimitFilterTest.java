package io.github.tobiashstbrg.shippingtracker.config;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class RateLimitFilterTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private RateLimitFilter rateLimitFilter;

    @Test
    void shouldAllowFirst100Requests() throws Exception {
        for (int i = 0; i < 100; i++) {
            mockMvc.perform(get("/api/shipments/TRACK001"))
                    .andExpect(status().isOk());
        }
    }

    @BeforeEach
    void setUp() {
        rateLimitFilter.resetBuckets();  // ← Reset vor jedem Test
    }

    @Test
    void shouldBlock101stRequest() throws Exception {
        for (int i = 0; i < 100; i++) {
            mockMvc.perform(get("/api/shipments/TRACK001"))
                    .andExpect(status().isOk());
        }

        // Test 101st request to see if it hits the rate limit
        mockMvc.perform(get("/api/shipments/TRACK001"))
                .andExpect(status().isTooManyRequests())  // ← 429
                .andExpect(jsonPath("$.error").value("Too Many Requests"));
    }
}

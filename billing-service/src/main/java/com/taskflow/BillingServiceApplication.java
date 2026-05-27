package com.taskflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@SpringBootApplication
@RestController
public class BillingServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(BillingServiceApplication.class, args);
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "healthy", "service", "billing-service");
    }

    @GetMapping("/billing/summary")
    public Map<String, Object> businessLogic() {
        return Map.of("total_revenue", 45230.00, "active_subscriptions", 156, "mrr", 12500.00);
    }
}

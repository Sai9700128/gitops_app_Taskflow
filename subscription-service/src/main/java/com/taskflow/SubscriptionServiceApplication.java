package com.taskflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@SpringBootApplication
@RestController
public class SubscriptionServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(SubscriptionServiceApplication.class, args);
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "healthy", "service", "subscription-service");
    }

    @GetMapping("/subscriptions")
    public List<Map<String, Object>> businessLogic() {
        return List.of(Map.of("id", "sub_1", "plan", "pro", "status", "active", "renews_at", "2026-06-20"));
    }
}

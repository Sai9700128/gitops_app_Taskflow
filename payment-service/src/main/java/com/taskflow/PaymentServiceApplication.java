package com.taskflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@SpringBootApplication
@RestController
public class PaymentServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(PaymentServiceApplication.class, args);
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "healthy", "service", "payment-service");
    }

    @GetMapping("/payments")
    public List<Map<String, Object>> businessLogic() {
        return List.of(Map.of("id", "pay_1", "amount", 99.99, "currency", "USD", "status", "completed"));
    }
}

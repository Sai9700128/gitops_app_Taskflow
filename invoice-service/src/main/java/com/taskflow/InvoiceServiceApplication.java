package com.taskflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@SpringBootApplication
@RestController
public class InvoiceServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(InvoiceServiceApplication.class, args);
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "healthy", "service", "invoice-service");
    }

    @GetMapping("/invoices")
    public List<Map<String, Object>> businessLogic() {
        return List.of(Map.of("id", "inv_1", "amount", 299.00, "due_date", "2026-06-01", "status", "pending"));
    }
}

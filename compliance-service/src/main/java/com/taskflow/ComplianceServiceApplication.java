package com.taskflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@SpringBootApplication
@RestController
public class ComplianceServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ComplianceServiceApplication.class, args);
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "healthy", "service", "compliance-service");
    }

    @GetMapping("/compliance/status")
    public Map<String, String> businessLogic() {
        return Map.of("gdpr", "compliant", "soc2", "in_progress", "hipaa", "not_applicable");
    }
}

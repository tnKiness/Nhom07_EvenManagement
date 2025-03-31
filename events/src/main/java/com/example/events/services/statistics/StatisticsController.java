package com.example.events.services.statistics;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stats")
public class StatisticsController {
    
    @Autowired
    private StatisticsService statisticsService;

    @GetMapping
    public ResponseEntity<?> getStats() {
        Map<String, Integer> stats = statisticsService.getStatistics();
        return new ResponseEntity<>(stats, HttpStatus.OK);
    }
}

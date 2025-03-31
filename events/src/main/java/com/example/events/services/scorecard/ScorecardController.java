package com.example.events.services.scorecard;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.events.services.scorecard.business.ScorecardService;
import com.example.events.services.scorecard.persistence.ScorecardDto;

@RestController
@RequestMapping("/api/scorecards")
public class ScorecardController {
    
    @Autowired
    private ScorecardService scorecardService;

    @PostMapping
    public ScorecardDto addScorecard(@RequestBody ScorecardDto scorecardDto) {
        return scorecardService.addScorecard(scorecardDto);
    }

    @GetMapping
    public List<ScorecardDto> getAllScorecards() {
        return scorecardService.getAllScorecards();
    }

    @GetMapping("/{id}")
    public ScorecardDto getScorecardById(@PathVariable String id) {
        return scorecardService.getScorecardById(id);
    }

    @PutMapping("/{id}")
    public ScorecardDto updateScorecard(@PathVariable String id, @RequestBody ScorecardDto scorecardDto) {
        return scorecardService.updateScorecard(id, scorecardDto);
    }

    @DeleteMapping("/{id}")
    public void deleteScorecard(@PathVariable String id) {
        scorecardService.deleteScorecard(id);
    }
}

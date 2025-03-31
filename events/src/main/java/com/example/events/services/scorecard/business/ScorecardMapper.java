package com.example.events.services.scorecard.business;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.example.events.services.scorecard.persistence.Scorecard;
import com.example.events.services.scorecard.persistence.ScorecardDto;

@Component
public class ScorecardMapper {
    public ScorecardDto toDto(Scorecard scorecard) {
        return new ScorecardDto(scorecard.getScore(), scorecard.getLastUpdated().toString());
    }

    public Scorecard toEntity(ScorecardDto scorecardDto) {
        return new Scorecard(scorecardDto.getScore(), LocalDateTime.parse(scorecardDto.getLastUpdated()));
    }
}

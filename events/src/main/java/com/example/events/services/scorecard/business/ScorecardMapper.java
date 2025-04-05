package com.example.events.services.scorecard.business;

import org.springframework.stereotype.Component;

import com.example.events.services.scorecard.persistence.Scorecard;
import com.example.events.services.scorecard.persistence.ScorecardDto;
import com.example.events.util.helper.DateTimeParser;

@Component
public class ScorecardMapper {
    public ScorecardDto toDto(Scorecard scorecard) {
        ScorecardDto scorecardDto = new ScorecardDto(scorecard.getScore(), DateTimeParser.fromLocalDateTime(scorecard.getLastUpdated()));
        scorecardDto.setId(scorecard.getId());
        return scorecardDto;
    }

    public Scorecard toEntity(ScorecardDto scorecardDto) {
        Scorecard scorecard = new Scorecard(scorecardDto.getScore(), DateTimeParser.toLocalDateTime(scorecardDto.getLastUpdated()));
        scorecard.setId(scorecardDto.getId());
        return scorecard;
    }
}

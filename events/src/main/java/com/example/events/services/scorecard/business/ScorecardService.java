package com.example.events.services.scorecard.business;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.events.services.scorecard.persistence.Scorecard;
import com.example.events.services.scorecard.persistence.ScorecardDto;
import com.example.events.services.scorecard.persistence.ScorecardRepository;

@Service
public class ScorecardService {
    
    @Autowired
    private ScorecardRepository scorecardRepository;

    @Autowired
    private ScorecardMapper scorecardMapper;

    public ScorecardDto addScorecard(ScorecardDto scorecardDto) {
        Scorecard scorecard = scorecardMapper.toEntity(scorecardDto);
        scorecardRepository.save(scorecard);
        return scorecardDto;
    }

    public List<ScorecardDto> getAllScorecards() {
        List<Scorecard> scorecards = scorecardRepository.findAll();
        return scorecards.stream().map(scorecardMapper::toDto).collect(Collectors.toList());
    }

    public ScorecardDto getScorecardById(String id) {
        Scorecard scorecard = scorecardRepository.findById(id).orElse(null);
        return scorecardMapper.toDto(scorecard);
    }

    public ScorecardDto updateScorecard(String id, ScorecardDto scorecardDto) {
        Scorecard updatedScorecard = scorecardRepository.findById(id).orElse(null);

        if (updatedScorecard != null) {
            updatedScorecard.setScore(scorecardDto.getScore());

            scorecardRepository.save(updatedScorecard);
            return scorecardDto;
        } else {
            throw new RuntimeException("Scorecard not found with id: " + id);
        }
    }

    public void deleteScorecard(String id) {
        // Tìm Scorecard theo id
        Scorecard scorecard = scorecardRepository.findById(id).orElseThrow(() -> 
            new RuntimeException("Scorecard not found with id: " + id)
        );
    
        // Xóa Scorecard nếu tìm thấy
        scorecardRepository.delete(scorecard);
    }
}

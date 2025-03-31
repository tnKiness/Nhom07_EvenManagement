package com.example.events.services.scorecard.persistence;

public class ScorecardDto {
    private int score;
    private String lastUpdated;

    public ScorecardDto() { }

    public ScorecardDto(int score, String lastUpdated) {
        this.score = score;
        this.lastUpdated = lastUpdated;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(String lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}

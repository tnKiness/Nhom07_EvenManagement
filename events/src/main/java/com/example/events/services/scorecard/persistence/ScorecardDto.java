package com.example.events.services.scorecard.persistence;

public class ScorecardDto {
    private String id;
    private int score;
    private String lastUpdated;

    public ScorecardDto() { }

    public ScorecardDto(int score, String lastUpdated) {
        this.id = "";
        this.score = score;
        this.lastUpdated = lastUpdated;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

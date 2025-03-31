package com.example.events.services.scorecard.persistence;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

public class Scorecard {

    @Id
    private String id;

    private int score;
    private LocalDateTime lastUpdated;

    public Scorecard() {
        this.score = 0;
        this.lastUpdated = LocalDateTime.now();
    }

    public Scorecard(int score, LocalDateTime lastUpdated) {
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
        this.lastUpdated = LocalDateTime.now();
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    @Override
    public String toString() {
        return "Scorecard [score=" + score + ", lastUpdated=" + lastUpdated + "]";
    }
}

package com.example.events.services.scorecard.persistence;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ScorecardRepository extends MongoRepository<Scorecard, String> {
    
}

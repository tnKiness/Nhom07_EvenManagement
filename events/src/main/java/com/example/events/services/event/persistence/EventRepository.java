package com.example.events.services.event.persistence;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.events.services.category.persistence.Category;

public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findByNameContainingIgnoreCase(String name);
    List<Event> findByCategory(Category category);
}

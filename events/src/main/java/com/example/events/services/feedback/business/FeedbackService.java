package com.example.events.services.feedback.business;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.events.services.event.business.EventMapper;
import com.example.events.services.event.business.EventService;
import com.example.events.services.event.persistence.Event;
import com.example.events.services.feedback.persistence.Feedback;
import com.example.events.services.feedback.persistence.FeedbackDto;
import com.example.events.services.feedback.persistence.FeedbackRepository;

@Service
public class FeedbackService {

    @Autowired
    private EventService eventService;

    @Autowired
    private EventMapper eventMapper;
    
    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private FeedbackMapper feedbackMapper;

    public FeedbackDto addFeedback(FeedbackDto feedbackDto) {
        Event event = eventMapper.toEntity(eventService.getEventById(feedbackDto.getEventId()));
        if (event == null) {
            throw new RuntimeException("Event not found with id: " + feedbackDto.getEventId());
        }

        Feedback feedback = feedbackMapper.toEntity(feedbackDto);
        feedbackRepository.save(feedback);
        return feedbackDto;
    }

    public List<FeedbackDto> getAllFeedbacks() {
        List<Feedback> feedbacks = feedbackRepository.findAll();
        return feedbacks.stream().map(feedbackMapper::toDto).collect(Collectors.toList());
    }

    public List<FeedbackDto> getFeedbacksByEventId(String eventId) {
        List<Feedback> feedbacks = feedbackRepository.findByEventId(eventId);
        return feedbacks.stream().map(feedbackMapper::toDto).collect(Collectors.toList());
    }
}

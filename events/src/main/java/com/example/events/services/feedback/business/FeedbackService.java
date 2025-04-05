package com.example.events.services.feedback.business;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.events.services.feedback.persistence.Feedback;
import com.example.events.services.feedback.persistence.FeedbackDto;
import com.example.events.services.feedback.persistence.FeedbackRepository;

@Service
public class FeedbackService {
    
    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private FeedbackMapper feedbackMapper;

    public FeedbackDto addFeedback(FeedbackDto feedbackDto) {
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

    public void deleteFeedback(String id) {
        Feedback feedback = feedbackRepository.findById(id).orElse(null);
        if (feedback != null) {
            feedbackRepository.delete(feedback);
        } else {
            throw new RuntimeException("Feedback not found with id: " + id);
        }
    }
}

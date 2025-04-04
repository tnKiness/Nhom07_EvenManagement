package com.example.events.services.feedback;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.events.services.feedback.business.FeedbackService;
import com.example.events.services.feedback.persistence.FeedbackDto;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
    
    @Autowired
    private FeedbackService feedbackService;

    @PostMapping
    public FeedbackDto addFeedback(@RequestBody FeedbackDto feedbackDto) {
        return feedbackService.addFeedback(feedbackDto);
    }

    @GetMapping
    public List<FeedbackDto> getAllFeedbacks() {
        return feedbackService.getAllFeedbacks();
    }

    @GetMapping("/{eventId}")
    public List<FeedbackDto> getFeedbacksByEventId(@PathVariable("eventId") String eventId) {
        return feedbackService.getFeedbacksByEventId(eventId);
    }

    @DeleteMapping("/{id}")
    public void deleteFeedback(@PathVariable("id") String id) {
        feedbackService.deleteFeedback(id);
    }
}

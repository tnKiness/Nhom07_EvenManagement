package com.example.events.services.feedback.business;

import org.springframework.stereotype.Component;

import com.example.events.services.feedback.persistence.Feedback;
import com.example.events.services.feedback.persistence.FeedbackDto;

@Component
public class FeedbackMapper {
    public FeedbackDto toDto(Feedback feedback) {
        return new FeedbackDto(feedback.getStudentId(), feedback.getEventId(), feedback.getContent());
    }

    public Feedback toEntity(FeedbackDto feedbackDto) {
        return new Feedback(feedbackDto.getStudentId(), feedbackDto.getEventId(), feedbackDto.getContent());
    }
}

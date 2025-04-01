package com.example.events.services.feedback.business;

import org.springframework.stereotype.Component;

import com.example.events.services.feedback.persistence.Feedback;
import com.example.events.services.feedback.persistence.FeedbackDto;
import com.example.events.util.helper.DateTimeParser;

@Component
public class FeedbackMapper {
    public FeedbackDto toDto(Feedback feedback) {
        FeedbackDto feedbackDto = new FeedbackDto(
            feedback.getUserId(),
            feedback.getEventId(),
            feedback.getContent(),
            DateTimeParser.fromLocalDateTime(feedback.getCreatedAt())
        );
        feedbackDto.setId(feedback.getId());
        return feedbackDto;
    }

    public Feedback toEntity(FeedbackDto feedbackDto) {
        Feedback feedback = new Feedback(
            feedbackDto.getUserId(),
            feedbackDto.getEventId(),
            feedbackDto.getContent(),
            DateTimeParser.toLocalDateTime(feedbackDto.getCreatedAt())
        );
        feedback.setId(feedbackDto.getId());
        return feedback;
    }
}

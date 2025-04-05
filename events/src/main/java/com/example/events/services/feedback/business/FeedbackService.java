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

    // Thêm phản hồi mới
    public FeedbackDto addFeedback(FeedbackDto feedbackDto) {
        Feedback feedback = feedbackMapper.toEntity(feedbackDto);
        feedbackRepository.save(feedback);
        return feedbackDto;
    }

    // Lấy tất cả các phản hồi
    public List<FeedbackDto> getAllFeedbacks() {
        List<Feedback> feedbacks = feedbackRepository.findAll();
        return feedbacks.stream().map(feedbackMapper::toDto).collect(Collectors.toList());
    }

    // Lấy phản hồi theo mã sự kiện
    public List<FeedbackDto> getFeedbacksByEventId(String eventId) {
        List<Feedback> feedbacks = feedbackRepository.findByEventId(eventId);
        return feedbacks.stream().map(feedbackMapper::toDto).collect(Collectors.toList());
    }

    // Xóa phản hồi theo mã ID
    public void deleteFeedback(String id) {
        feedbackRepository.findById(id).ifPresentOrElse(
            feedbackRepository::delete,
            () -> {
                throw new RuntimeException("Feedback not found with id: " + id);
            }
        );
    }
}

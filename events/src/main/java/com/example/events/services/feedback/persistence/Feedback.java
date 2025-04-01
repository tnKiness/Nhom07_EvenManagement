package com.example.events.services.feedback.persistence;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

public class Feedback {

    @Id
    private String id;

    private String userId;
    private String eventId;
    private String content;
    private LocalDateTime createdAt;

    public Feedback() { }

    public Feedback(String userId, String eventId, String content, LocalDateTime createdAt) {
        this.userId = userId;
        this.eventId = eventId;
        this.content = content;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "Feedback [id=" + id + ", userId=" + userId + ", eventId=" + eventId + ", content=" + content
                + ", createdAt=" + createdAt + "]";
    }
}

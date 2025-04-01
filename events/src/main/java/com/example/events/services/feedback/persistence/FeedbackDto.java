package com.example.events.services.feedback.persistence;

public class FeedbackDto {
    private String id;
    private String userId;
    private String eventId;
    private String content;
    private String createdAt;

    public FeedbackDto() { }

    public FeedbackDto(String userId, String eventId, String content, String createdAt) {
        this.id = "";
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

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}

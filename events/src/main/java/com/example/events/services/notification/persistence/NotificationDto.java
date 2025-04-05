package com.example.events.services.notification.persistence;

public class NotificationDto {
    private String id;
    private String message;
    private String createdAt;
    private String sentAt;

    public NotificationDto() { }

    public NotificationDto(String message, String createdAt) {
        this.id = "";
        this.message = message;
        this.createdAt = createdAt;
        this.sentAt = "";
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getSentAt() {
        return sentAt;
    }

    public void setSentAt(String sentAt) {
        this.sentAt = sentAt;
    }
}

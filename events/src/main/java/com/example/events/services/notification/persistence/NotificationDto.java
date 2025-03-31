package com.example.events.services.notification.persistence;

public class NotificationDto {
    private String message;
    private String createdAt;

    public NotificationDto() { }

    public NotificationDto(String message, String createdAt) {
        this.message = message;
        this.createdAt = createdAt;
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
}

package com.example.events.services.notification.persistence;

public class NotificationDto {
    private String id;
    private String message;
    private String createdAt;

    public NotificationDto() { }

    public NotificationDto(String message, String createdAt) {
        this.id = "";
        this.message = message;
        this.createdAt = createdAt;
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
}

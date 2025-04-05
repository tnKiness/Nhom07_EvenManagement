package com.example.events.services.notification.persistence;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

public class Notification {

    @Id
    private String id;
    
    private String message;
    private LocalDateTime createdAt;
    private LocalDateTime sentAt;

    public Notification() { }

    public Notification(String message, LocalDateTime createdAt) {
        this.message = message;
        this.createdAt = createdAt;
        this.sentAt = LocalDateTime.now();
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getSentAt() {
        return sentAt;
    }

    public void setSentAt(LocalDateTime sentAt) {
        this.sentAt = sentAt;
    }

    @Override
    public String toString() {
        return "Notification [id=" + id + ", message=" + message + ", createdAt=" + createdAt + ", sentAt=" + sentAt
                + "]";
    }
}

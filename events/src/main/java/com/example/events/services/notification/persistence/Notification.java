package com.example.events.services.notification.persistence;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

public class Notification {

    @Id
    private String id;
    
    private String message;
    private LocalDateTime createdAt;

    public Notification() { }

    public Notification(String message) {
        this.message = message;
        this.createdAt = LocalDateTime.now();
    }

    public Notification(String message, LocalDateTime createdAt) {
        this.message = message;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    @Override
    public String toString() {
        return "Notification [id=" + id + ", message=" + message + ", createdAt=" + createdAt + "]";
    }
}

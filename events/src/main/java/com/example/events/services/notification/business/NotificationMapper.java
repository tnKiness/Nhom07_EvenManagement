package com.example.events.services.notification.business;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.example.events.services.notification.persistence.Notification;
import com.example.events.services.notification.persistence.NotificationDto;

@Component
public class NotificationMapper {
    public NotificationDto toDto(Notification notification) {
        return new NotificationDto(notification.getMessage(), notification.getCreatedAt().toString());
    }

    public Notification toEntity(NotificationDto notificationDto) {
        return new Notification(notificationDto.getMessage(), LocalDateTime.parse(notificationDto.getCreatedAt()));
    }
}

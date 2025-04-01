package com.example.events.services.notification.business;

import org.springframework.stereotype.Component;

import com.example.events.services.notification.persistence.Notification;
import com.example.events.services.notification.persistence.NotificationDto;
import com.example.events.util.helper.DateTimeParser;

@Component
public class NotificationMapper {
    public NotificationDto toDto(Notification notification) {
        NotificationDto notificationDto = new NotificationDto(notification.getMessage(), DateTimeParser.fromLocalDateTime(notification.getCreatedAt()));
        notificationDto.setId(notification.getId());
        return notificationDto;
    }

    public Notification toEntity(NotificationDto notificationDto) {
        Notification notification = new Notification(notificationDto.getMessage(), DateTimeParser.toLocalDateTime(notificationDto.getCreatedAt()));
        notification.setId(notificationDto.getId());
        return notification;
    }
}

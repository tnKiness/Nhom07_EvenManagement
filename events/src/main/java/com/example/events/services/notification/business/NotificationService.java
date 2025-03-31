package com.example.events.services.notification.business;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.events.services.notification.persistence.Notification;
import com.example.events.services.notification.persistence.NotificationDto;
import com.example.events.services.notification.persistence.NotificationRepository;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;
    
    @Autowired
    private NotificationMapper notificationMapper;

    public NotificationDto addNotification(NotificationDto notificationDto) {
        notificationRepository.save(notificationMapper.toEntity(notificationDto));
        return notificationDto;
    }

    public List<NotificationDto> getAllNotifications() {
        List<Notification> notifications = notificationRepository.findAll();
        return notifications.stream().map(notificationMapper::toDto).collect(Collectors.toList());
    }

    public NotificationDto getNotificationById(String notificationId) {
        return notificationMapper.toDto(notificationRepository.findById(notificationId).orElse(null));
    }
}

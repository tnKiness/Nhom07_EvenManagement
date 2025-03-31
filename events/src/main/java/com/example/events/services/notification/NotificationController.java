package com.example.events.services.notification;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.events.services.notification.business.NotificationService;
import com.example.events.services.notification.persistence.NotificationDto;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    
    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public NotificationDto addNotification(@RequestBody NotificationDto notificationDto) {
        return notificationService.addNotification(notificationDto);
    }

    @GetMapping
    public List<NotificationDto> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @GetMapping("/{id}")
    public NotificationDto getNotificationById(@RequestParam String id) {
        return notificationService.getNotificationById(id);
    }
}

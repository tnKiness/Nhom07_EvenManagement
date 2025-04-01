package com.example.events.services.user.business;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.example.events.services.notification.persistence.Notification;
import com.example.events.services.notification.persistence.NotificationDto;
import com.example.events.services.scorecard.persistence.Scorecard;
import com.example.events.services.scorecard.persistence.ScorecardDto;
import com.example.events.services.user.persistence.User;
import com.example.events.services.user.persistence.UserDto;

@Component
public class UserMapper {
    public UserDto toDto(User user) {
        UserDto userDto = new UserDto(
            user.getUsername(),
            user.getPassword(),
            user.getRole().name(),
            user.getStudentId(),
            user.getName(),
            user.getEmail(),
            user.getPhoneNumber(),
            new ArrayList<NotificationDto>(),
            new ScorecardDto()
        );

        List<Notification> userNotifications = user.getNotifications();
        if (userNotifications != null) {
            userDto.setNotifications(userNotifications.stream().map(notification -> {
                return new NotificationDto(notification.getMessage(), notification.getCreatedAt().toString());
            }).collect(Collectors.toList()));
        }

        Scorecard userScorecard = user.getScorecard();
        if (userScorecard != null) {
            userDto.setScorecard(new ScorecardDto(userScorecard.getScore(), userScorecard.getLastUpdated().toString()));
        }

        userDto.setId(user.getId());
        userDto.setAvatar(user.getAvatar());
        return userDto;
    }

    public User toEntity(UserDto userDto) {
        if (userDto.getRole().equals("ROLE_USER")) {
            User user = new User(
                userDto.getStudentId(),
                userDto.getName(),
                userDto.getEmail(),
                userDto.getPhoneNumber(),
                userDto.getPassword(),
                userDto.getAvatar()
            );

            user.setNotifications(userDto.getNotifications().stream().map(notificationDto -> {
                Notification notification = new Notification(notificationDto.getMessage(), LocalDateTime.parse(notificationDto.getCreatedAt()));
                notification.setId(notificationDto.getId());
                return notification;
            }).collect(Collectors.toList()));

            ScorecardDto userDtoScorecard = userDto.getScorecard();
            Scorecard userScorecard = new Scorecard(userDtoScorecard.getScore(), LocalDateTime.parse(userDtoScorecard.getLastUpdated()));
            userScorecard.setId(userDtoScorecard.getId());
            user.setScorecard(userScorecard);

            return user;
        } else {
            User user = new User(userDto.getUsername(), userDto.getPassword(), userDto.getAvatar());
            user.setId(userDto.getId());
            return user;
        }
    }
}

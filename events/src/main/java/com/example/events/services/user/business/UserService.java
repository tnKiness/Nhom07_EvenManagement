package com.example.events.services.user.business;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.events.services.notification.business.NotificationService;
import com.example.events.services.notification.persistence.Notification;
import com.example.events.services.notification.persistence.NotificationDto;
import com.example.events.services.scorecard.business.ScorecardService;
import com.example.events.services.scorecard.persistence.Scorecard;
import com.example.events.services.scorecard.persistence.ScorecardDto;
import com.example.events.services.user.persistence.User;
import com.example.events.services.user.persistence.UserDto;
import com.example.events.services.user.persistence.UserRepository;
import com.example.events.util.enums.UserRole;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ScorecardService scorecardService;

    @Autowired
    private NotificationService notificationService;

    public UserDto addUser(UserDto userDto) {
        User user = userMapper.toEntity(userDto);
        user.setPassword(new BCryptPasswordEncoder().encode(userDto.getPassword()));
        
        if (userDto.getRole().equals("ROLE_USER")) {
            Scorecard userScorecard = user.getScorecard();
            scorecardService.addScorecard(new ScorecardDto(userScorecard.getScore(), userScorecard.getLastUpdated().toString()));
        }
        userRepository.save(user);
        return userDto;
    }

    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(user -> {
            return userMapper.toDto(user);
        }).collect(Collectors.toList());
    }

    public UserDto getUserById(String id) {
        User user = userRepository.findById(id).orElse(null);
        return userMapper.toDto(user);
    }

    public UserDto updateUser(String id, UserDto userDto) {
        Optional<User> userDb = userRepository.findById(id);

        if (userDb.isPresent()) {
            User updatedUser = userDb.get();

            updatedUser.setUsername(userDto.getUsername());
            updatedUser.setPassword(new BCryptPasswordEncoder().encode(userDto.getPassword()));
            updatedUser.setRole(UserRole.fromValue(userDto.getRole()));
            updatedUser.setStudentId(userDto.getStudentId());
            updatedUser.setName(userDto.getName());
            updatedUser.setEmail(userDto.getEmail());
            updatedUser.setPhoneNumber(userDto.getPhoneNumber());

            userRepository.save(updatedUser);
            return userDto;
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }

    public void deleteUser(String id) {
        Optional<User> userDb = userRepository.findById(id);

        if (userDb.isPresent()) {
            scorecardService.deleteScorecard(id);
            userRepository.delete(userDb.get());
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }

    public UserDto getUserByUsername(String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        return userMapper.toDto(user);
    }

    public List<UserDto> getUsersByUsernameContaining(String username) {
        List<User> users = userRepository.findByUsernameContainingIgnoreCase(username);
        return users.stream().map(userMapper::toDto).collect(Collectors.toList());
    }

    public void massNotifyUsers(String notificationId) {
        List<User> users = userRepository.findAll();
        NotificationDto notificationDto = notificationService.getNotificationById(notificationId);
        
        users.forEach(user -> {
            user.getNotifications().add(new Notification(notificationDto.getMessage(), LocalDateTime.parse(notificationDto.getCreatedAt())));
            userRepository.save(user);
        });
    }

    public List<NotificationDto> getUserNotifications(String id) {
        User user = userRepository.findById(id).orElse(null);
        return user.getNotifications().stream().map(notification -> {
            return new NotificationDto(notification.getMessage(), notification.getCreatedAt().toString());
        }).collect(Collectors.toList());
    }
}

package com.example.events.services.user.business;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.events.services.cloudinary.CloudinaryService;
import com.example.events.services.notification.business.NotificationMapper;
import com.example.events.services.notification.persistence.NotificationDto;
import com.example.events.services.scorecard.persistence.Scorecard;
import com.example.events.services.scorecard.persistence.ScorecardRepository;
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
    private ScorecardRepository scorecardRepository;

    @Autowired
    private NotificationMapper notificationMapper;

    @Autowired
    private CloudinaryService cloudinaryService;

    public UserDto addUser(MultipartFile avatar, UserDto userDto) {
        User existingUser = userRepository.findByUsername(userDto.getUsername()).orElse(null);
        if (existingUser != null) {
            throw new RuntimeException("Student ID already exists");
        }

        if (avatar != null) {
            Map<?, ?> uploadResult = cloudinaryService.upload(avatar);
            System.out.println(uploadResult);
            userDto.setAvatar(uploadResult.get("url").toString());
        }

        User user = userMapper.toEntity(userDto);
        user.setPassword(new BCryptPasswordEncoder().encode(userDto.getPassword()));

        if (userDto.getRole().equals("ROLE_ADMIN")) {
            userRepository.save(user);
            return userDto;
        }

        Scorecard userScorecard = new Scorecard();
        scorecardRepository.save(userScorecard);
        user.setScorecard(userScorecard);

        userRepository.save(user);

        return userDto;
    }

    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(userMapper::toDto).collect(Collectors.toList());
    }

    public UserDto getUserById(String id) {
        User user = userRepository.findById(id).orElse(null);
        return userMapper.toDto(user);
    }

    public UserDto updateUser(String id, MultipartFile avatar, UserDto userDto) {
        Optional<User> userDb = userRepository.findById(id);

        if (userDb.isPresent()) {
            User updatedUser = userDb.get();

            updatedUser.setUsername(userDto.getUsername());
            updatedUser.setRole(UserRole.fromValue(userDto.getRole()));
            updatedUser.setStudentId(userDto.getStudentId());
            updatedUser.setName(userDto.getName());
            updatedUser.setEmail(userDto.getEmail());
            updatedUser.setPhoneNumber(userDto.getPhoneNumber());

            if (avatar != null) {
                Map<?, ?> uploadResult = cloudinaryService.upload(avatar);
                updatedUser.setAvatar((String)uploadResult.get("secure_url"));
            }

            userRepository.save(updatedUser);
            return userDto;
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }

    public void deleteUser(String id) {
        Optional<User> userDb = userRepository.findById(id);

        if (userDb.isPresent()) {
            scorecardRepository.deleteById(id);
            userRepository.delete(userDb.get());
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }

    public UserDto getUserByUsername(String username) {
        Optional<User> userDb = userRepository.findByUsername(username);

        if (userDb.isPresent()) {
            return userMapper.toDto(userDb.get());
        } else {
            throw new RuntimeException("User not found with username: " + username);
        }
    }

    public List<UserDto> getUsersByUsernameContaining(String username) {
        List<User> users = userRepository.findByUsernameContainingIgnoreCase(username);
        return users.stream().map(userMapper::toDto).collect(Collectors.toList());
    }

    public void massNotifyUsers(NotificationDto notificationDto) {
        List<User> users = userRepository.findAll();
        users.forEach(user -> {
            if (!user.getRole().equals(UserRole.ROLE_ADMIN)) {
                if (user.getNotifications() != null) {
                    user.getNotifications().add(notificationMapper.toEntity(notificationDto));
                } else {
                    user.setNotifications(List.of(notificationMapper.toEntity(notificationDto)));
                }
                userRepository.save(user);
            }
        });
    }
}

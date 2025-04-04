package com.example.events.services.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.events.services.notification.persistence.NotificationDto;
import com.example.events.services.user.business.UserService;
import com.example.events.services.user.persistence.UserDto;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;

    @PostMapping(consumes = { "multipart/form-data" })
    public UserDto addUser(@RequestPart("avatar") MultipartFile avatar, @RequestPart("data") UserDto userDto) {
        return userService.addUser(avatar, userDto);
    }

    @GetMapping
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserDto getUserById(@PathVariable("id") String id) {
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public UserDto updateUser(@PathVariable("id") String id, @RequestPart(name = "avatar", required = false) MultipartFile avatar, @RequestPart("data") UserDto userDto) {
        return userService.updateUser(id, avatar, userDto);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") String id) {
        userService.deleteUser(id);
    }

    @GetMapping("/by-username/{username}")
    public List<UserDto> searchUsersByUsername(@PathVariable("username") String username) {
        return userService.getUsersByUsernameContaining(username);
    }

    @PostMapping("/mass-notify")
    public void massNotifyUsers(@RequestBody NotificationDto notificationDto) {
        userService.massNotifyUsers(notificationDto);
    }
}

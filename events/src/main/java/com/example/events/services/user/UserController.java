package com.example.events.services.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.events.services.user.business.UserService;
import com.example.events.services.user.persistence.UserDto;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserDto getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public UserDto updateUser(@PathVariable String id, @RequestBody UserDto userDto) {
        return userService.updateUser(id, userDto);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }

    @GetMapping("/search-by-username/{username}")
    public List<UserDto> searchUsersByUsername(@PathVariable String username) {
        return userService.getUsersByUsernameContaining(username);
    }

    @PostMapping("/mass-notify")
    public void massNotifyUsers(@RequestBody String notificationId) {
        userService.massNotifyUsers(notificationId);
    }
}

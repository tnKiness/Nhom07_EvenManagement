package com.example.events.services.user.persistence;

import java.util.List;

import com.example.events.services.notification.persistence.NotificationDto;
import com.example.events.services.scorecard.persistence.ScorecardDto;

public class UserDto {
    private String username;
    private String password;
    private String role;
    private String studentId;
    private String name;
    private String email;
    private String phoneNumber;
    private List<NotificationDto> notifications;
    private ScorecardDto scorecard;

    public UserDto() { }

    public UserDto(String username, String password, String role, String studentId, String name, String email, 
        String phoneNumber, List<NotificationDto> notifications, ScorecardDto scorecard) {
        
        this.username = username;
        this.password = password;
        this.role = role;
        this.studentId = studentId;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.notifications = notifications;
        this.scorecard = scorecard;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<NotificationDto> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<NotificationDto> notifications) {
        this.notifications = notifications;
    }

    public ScorecardDto getScorecard() {
        return scorecard;
    }

    public void setScorecard(ScorecardDto scorecard) {
        this.scorecard = scorecard;
    }
}

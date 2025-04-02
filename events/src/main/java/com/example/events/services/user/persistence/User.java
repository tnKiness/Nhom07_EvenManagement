package com.example.events.services.user.persistence;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import com.example.events.services.notification.persistence.Notification;
import com.example.events.services.scorecard.persistence.Scorecard;
import com.example.events.util.enums.UserRole;

public class User {
    
    @Id
    private String id;

    private String username;
    private String password;
    private UserRole role;
    
    // Following four properties for students only
    private String studentId;
    private String name;
    private String email;
    private String phoneNumber;

    private String avatar;

    @DBRef
    private List<Notification> notifications;

    @DBRef
    private Scorecard scorecard;

    public User() { }

    public User(String username, String password, String avatar) {
        this.username = username;
        this.password = password;
        this.avatar = avatar;
        this.role = UserRole.ROLE_ADMIN;
    }

    public User(String studentId, String name, String email, String phoneNumber, String password, String avatar) {
        this.studentId = studentId;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;

        this.username = studentId;
        this.password = password;
        this.avatar = avatar;
        this.role = UserRole.ROLE_USER;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
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

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public List<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<Notification> notifications) {
        this.notifications = notifications;
    }

    public Scorecard getScorecard() {
        return scorecard;
    }

    public void setScorecard(Scorecard scorecard) {
        this.scorecard = scorecard;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", username=" + username + ", password=" + password + ", role=" + role
                + ", studentId=" + studentId + ", name=" + name + ", email=" + email + ", phoneNumber=" + phoneNumber
                + ", avatar=" + avatar + ", notifications=" + notifications + ", scorecard=" + scorecard + "]";
    }
}

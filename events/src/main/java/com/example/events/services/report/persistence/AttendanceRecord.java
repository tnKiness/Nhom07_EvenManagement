package com.example.events.services.report.persistence;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

import com.example.events.util.enums.AttendanceStatus;

public class AttendanceRecord {

    @Id
    private String id;

    private String userId;
    private String eventId;
    private String eventName;
    private LocalDateTime registeredAt;
    private AttendanceStatus attendanceStatus;

    public AttendanceRecord() { }

    public AttendanceRecord(String userId, String eventId, String eventName, LocalDateTime registeredAt, AttendanceStatus attendanceStatus) {
        this.userId = userId;
        this.eventId = eventId;
        this.eventName = eventName;
        this.registeredAt = registeredAt;
        this.attendanceStatus = attendanceStatus;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }
    
    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public LocalDateTime getRegisteredAt() {
        return registeredAt;
    }

    public void setRegisteredAt(LocalDateTime registeredAt) {
        this.registeredAt = registeredAt;
    }

    public AttendanceStatus getAttendanceStatus() {
        return attendanceStatus;
    }

    public void setAttendanceStatus(AttendanceStatus attendanceStatus) {
        this.attendanceStatus = attendanceStatus;
    }

    @Override
    public String toString() {
        return "AttendanceRecord [id=" + id + ", userId=" + userId + ", eventId=" + eventId + ", eventName=" + eventName
                + ", registeredAt=" + registeredAt + ", attendanceStatus=" + attendanceStatus + "]";
    }
}

package com.example.events.services.attendance.persistence;

public class AttendanceRecordDto {
    private String id;
    private String userId;
    private String eventId;
    private String eventName;
    private String registeredAt;
    private String attendanceStatus;

    public AttendanceRecordDto() { }

    public AttendanceRecordDto(String userId, String eventId, String eventName, String registeredAt, String attendanceStatus) {
        this.id = "";
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

    public String getRegisteredAt() {
        return registeredAt;
    }

    public void setRegisteredAt(String registeredAt) {
        this.registeredAt = registeredAt;
    }

    public String getAttendanceStatus() {
        return attendanceStatus;
    }

    public void setAttendanceStatus(String attendanceStatus) {
        this.attendanceStatus = attendanceStatus;
    }
}

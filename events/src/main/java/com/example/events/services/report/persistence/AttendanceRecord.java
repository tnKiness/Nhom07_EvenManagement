package com.example.events.services.report.persistence;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

import com.example.events.util.enums.AttendanceStatus;

public class AttendanceRecord {

    @Id
    private String id;

    private String studentId;
    private String studentName;
    private String eventId;
    private LocalDateTime registeredAt;
    private AttendanceStatus attendanceStatus;

    public AttendanceRecord() { }

    public AttendanceRecord(String studentId, String studentName, String eventId, AttendanceStatus attendanceStatus) {

        this.studentId = studentId;
        this.studentName = studentName;
        this.eventId = eventId;
        this.registeredAt = LocalDateTime.now();
        this.attendanceStatus = attendanceStatus;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
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
        return "AttendanceRecord [id=" + id + ", studentId=" + studentId + ", studentName=" + studentName + ", eventId="
                + eventId + ", registeredAt=" + registeredAt + ", attendanceStatus=" + attendanceStatus + "]";
    }
}

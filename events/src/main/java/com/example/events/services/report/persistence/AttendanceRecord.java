package com.example.events.services.report.persistence;

import org.springframework.data.annotation.Id;

import com.example.events.util.enums.AttendanceStatus;

public class AttendanceRecord {

    @Id
    private String id;

    private String studentId;
    private String eventId;
    private AttendanceStatus attendanceStatus;

    public AttendanceRecord() { }

    public AttendanceRecord(String studentId, String eventId, AttendanceStatus attendanceStatus) {
        this.studentId = studentId;
        this.eventId = eventId;
        this.attendanceStatus = attendanceStatus;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public AttendanceStatus getAttendanceStatus() {
        return attendanceStatus;
    }

    public void setAttendanceStatus(AttendanceStatus attendanceStatus) {
        this.attendanceStatus = attendanceStatus;
    }

    @Override
    public String toString() {
        return "AttendanceRecord [studentId=" + studentId + ", eventId=" + eventId + ", attendanceStatus="
                + attendanceStatus + "]";
    }
}

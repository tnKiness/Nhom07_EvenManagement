package com.example.events.services.report.persistence;

public class AttendanceRecordDto {
    private String studentId;
    private String eventId;
    private String attendanceStatus;

    public AttendanceRecordDto() { }

    public AttendanceRecordDto(String studentId, String eventId, String attendanceStatus) {
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

    public String getAttendanceStatus() {
        return attendanceStatus;
    }

    public void setAttendanceStatus(String attendanceStatus) {
        this.attendanceStatus = attendanceStatus;
    }
}

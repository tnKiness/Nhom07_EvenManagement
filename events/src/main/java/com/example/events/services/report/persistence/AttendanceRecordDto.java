package com.example.events.services.report.persistence;

public class AttendanceRecordDto {
    private String id;
    private String studentId;
    private String studentName;
    private String eventId;
    private String registeredAt;
    private String attendanceStatus;

    public AttendanceRecordDto() { }

    public AttendanceRecordDto(String studentId, String studentName, String eventId,
        String registeredAt, String attendanceStatus) {

        this.studentId = studentId;
        this.studentName = studentName;
        this.eventId = eventId;
        this.registeredAt = registeredAt;
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

package com.example.events.services.feedback.persistence;

public class FeedbackDto {
    private String studentId;
    private String eventId;
    private String content;

    public FeedbackDto() { }

    public FeedbackDto(String studentId, String eventId, String content) {
        this.studentId = studentId;
        this.eventId = eventId;
        this.content = content;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}

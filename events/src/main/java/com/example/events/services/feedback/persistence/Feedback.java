package com.example.events.services.feedback.persistence;

import org.springframework.data.annotation.Id;

public class Feedback {

    @Id
    private String id;

    private String studentId;
    private String eventId;
    private String content;

    public Feedback() { }

    public Feedback(String studentId, String eventId, String content) {
        this.studentId = studentId;
        this.eventId = eventId;
        this.content = content;
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

    @Override
    public String toString() {
        return "Feedback [id=" + id + ", studentId=" + studentId + ", eventId=" + eventId + ", content=" + content
                + "]";
    }
}

package com.example.events.services.attendance.persistence;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface AttendanceRecordRepository extends MongoRepository<AttendanceRecord, String> {
    List<AttendanceRecord> findByEventId(String eventId);
    List<AttendanceRecord> findByUserId(String userId);
}

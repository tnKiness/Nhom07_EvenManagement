package com.example.events.services.report.persistence;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface AttendanceRecordRepository extends MongoRepository<AttendanceRecord, String> {
    List<AttendanceRecord> findByEventId(String eventId);
}

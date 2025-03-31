package com.example.events.services.report.business;

import org.springframework.stereotype.Component;

import com.example.events.services.report.persistence.AttendanceRecord;
import com.example.events.services.report.persistence.AttendanceRecordDto;
import com.example.events.util.enums.AttendanceStatus;

@Component
public class AttendanceRecordMapper {
    public AttendanceRecordDto toDto(AttendanceRecord attendanceRecord) {
        return new AttendanceRecordDto(attendanceRecord.getEventId(), attendanceRecord.getStudentId(), attendanceRecord.getAttendanceStatus().name());
    }

    public AttendanceRecord toEntity(AttendanceRecordDto attendanceRecordDto) {
        return new AttendanceRecord(attendanceRecordDto.getEventId(), attendanceRecordDto.getStudentId(), AttendanceStatus.fromValue(attendanceRecordDto.getAttendanceStatus()));
    }
}

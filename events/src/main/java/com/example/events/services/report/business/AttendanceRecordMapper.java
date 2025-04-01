package com.example.events.services.report.business;

import org.springframework.stereotype.Component;

import com.example.events.services.report.persistence.AttendanceRecord;
import com.example.events.services.report.persistence.AttendanceRecordDto;
import com.example.events.util.enums.AttendanceStatus;
import com.example.events.util.helper.DateTimeParser;

@Component
public class AttendanceRecordMapper {
    public AttendanceRecordDto toDto(AttendanceRecord attendanceRecord) {
        AttendanceRecordDto attendanceRecordDto = new AttendanceRecordDto(
            attendanceRecord.getEventId(),
            attendanceRecord.getStudentId(),
            attendanceRecord.getStudentName(),
            DateTimeParser.fromLocalDateTime(attendanceRecord.getRegisteredAt()),
            attendanceRecord.getAttendanceStatus().name()
        );
        attendanceRecordDto.setId(attendanceRecord.getId());
        return attendanceRecordDto;
    }

    public AttendanceRecord toEntity(AttendanceRecordDto attendanceRecordDto) {
        AttendanceRecord attendanceRecord = new AttendanceRecord(
            attendanceRecordDto.getEventId(),
            attendanceRecordDto.getStudentId(),
            attendanceRecordDto.getStudentName(),
            AttendanceStatus.fromValue(attendanceRecordDto.getAttendanceStatus())
        );
        attendanceRecord.setId(attendanceRecordDto.getId());
        attendanceRecord.setRegisteredAt(DateTimeParser.toLocalDateTime(attendanceRecordDto.getRegisteredAt()));
        return attendanceRecord;
    }
}

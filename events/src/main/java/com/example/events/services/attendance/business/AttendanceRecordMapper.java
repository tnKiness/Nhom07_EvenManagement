package com.example.events.services.attendance.business;

import org.springframework.stereotype.Component;

import com.example.events.services.attendance.persistence.AttendanceRecord;
import com.example.events.services.attendance.persistence.AttendanceRecordDto;
import com.example.events.util.enums.AttendanceStatus;
import com.example.events.util.helper.DateTimeParser;

@Component
public class AttendanceRecordMapper {
    public AttendanceRecordDto toDto(AttendanceRecord attendanceRecord) {
        AttendanceRecordDto attendanceRecordDto = new AttendanceRecordDto(
            attendanceRecord.getUserId(),
            attendanceRecord.getEventId(),
            attendanceRecord.getEventName(),
            DateTimeParser.fromLocalDateTime(attendanceRecord.getRegisteredAt()),
            attendanceRecord.getAttendanceStatus().name()
        );
        attendanceRecordDto.setId(attendanceRecord.getId());
        return attendanceRecordDto;
    }

    public AttendanceRecord toEntity(AttendanceRecordDto attendanceRecordDto) {
        AttendanceRecord attendanceRecord = new AttendanceRecord(
            attendanceRecordDto.getUserId(),
            attendanceRecordDto.getEventId(),
            attendanceRecordDto.getEventName(),
            DateTimeParser.toLocalDateTime(attendanceRecordDto.getRegisteredAt()),
            AttendanceStatus.fromValue(attendanceRecordDto.getAttendanceStatus())
        );
        attendanceRecord.setId(attendanceRecordDto.getId());
        return attendanceRecord;
    }
}

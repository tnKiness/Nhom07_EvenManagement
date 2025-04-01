package com.example.events.services.report.business;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.events.services.report.persistence.AttendanceRecord;
import com.example.events.services.report.persistence.AttendanceRecordDto;
import com.example.events.services.report.persistence.AttendanceRecordRepository;
import com.example.events.util.enums.AttendanceStatus;

@Service
public class AttendanceRecordService {
    
    @Autowired
    private AttendanceRecordRepository attendanceRecordRepository;

    @Autowired
    private AttendanceRecordMapper attendanceRecordMapper;

    public AttendanceRecordDto addAttendanceRecord(AttendanceRecordDto attendanceRecordDto) {
        AttendanceRecord attendanceRecord = attendanceRecordMapper.toEntity(attendanceRecordDto);
        attendanceRecordRepository.save(attendanceRecord);
        return attendanceRecordDto;
    }

    public List<AttendanceRecordDto> getAllAttendanceRecords() {
        List<AttendanceRecord> attendanceRecords = attendanceRecordRepository.findAll();
        return attendanceRecords.stream().map(attendanceRecordMapper::toDto).collect(Collectors.toList());
    }

    public AttendanceRecordDto getAttendanceRecordById(String id) {
        AttendanceRecord attendanceRecord = attendanceRecordRepository.findById(id).orElse(null);
        return attendanceRecordMapper.toDto(attendanceRecord);
    }

    public AttendanceRecordDto updateAttendanceRecord(String id, AttendanceRecordDto attendanceRecordDto) {
        AttendanceRecord updatedAttendanceRecord = attendanceRecordRepository.findById(id).orElse(null);

        if (updatedAttendanceRecord != null) {
            updatedAttendanceRecord.setStudentId(attendanceRecordDto.getStudentId());
            updatedAttendanceRecord.setStudentName(attendanceRecordDto.getStudentName());
            updatedAttendanceRecord.setEventId(attendanceRecordDto.getEventId());
            updatedAttendanceRecord.setAttendanceStatus(AttendanceStatus.fromValue(attendanceRecordDto.getAttendanceStatus()));

            attendanceRecordRepository.save(updatedAttendanceRecord);
            return attendanceRecordDto;
        } else {
            throw new RuntimeException("Attendance record not found with id: " + id);
        }
    }

    public List<AttendanceRecordDto> getAttendanceRecordsByEventId(String eventId) {
        List<AttendanceRecord> attendanceRecords = attendanceRecordRepository.findByEventId(eventId);
        return attendanceRecords.stream().map(attendanceRecordMapper::toDto).collect(Collectors.toList());
    }
}

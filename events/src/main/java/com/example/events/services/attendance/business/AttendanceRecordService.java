package com.example.events.services.attendance.business;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.events.services.attendance.persistence.AttendanceRecord;
import com.example.events.services.attendance.persistence.AttendanceRecordDto;
import com.example.events.services.attendance.persistence.AttendanceRecordRepository;
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
            updatedAttendanceRecord.setUserId(attendanceRecordDto.getUserId());
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

    public List<AttendanceRecordDto> getAttendanceRecordsByUserId(String userId) {
        List<AttendanceRecord> attendanceRecords = attendanceRecordRepository.findByUserId(userId);
        return attendanceRecords.stream().map(attendanceRecordMapper::toDto).collect(Collectors.toList());
    }
}

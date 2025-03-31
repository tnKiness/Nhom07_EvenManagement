package com.example.events.services.report;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.events.services.report.business.AttendanceRecordService;
import com.example.events.services.report.persistence.AttendanceRecordDto;

@RestController
@RequestMapping("/api/attendance-records")
public class AttendanceRecordController {
    
    @Autowired
    private AttendanceRecordService attendanceRecordService;

    @PostMapping
    public AttendanceRecordDto addAttendanceRecord(@RequestBody AttendanceRecordDto attendanceRecordDto) {
        return attendanceRecordService.addAttendanceRecord(attendanceRecordDto);
    }

    @GetMapping
    public List<AttendanceRecordDto> getAllAttendanceRecords() {
        return attendanceRecordService.getAllAttendanceRecords();
    }

    @GetMapping("/{id}")
    public AttendanceRecordDto getAttendanceRecordById(@RequestParam String id) {
        return attendanceRecordService.getAttendanceRecordById(id);
    }

    @PutMapping("/{id}")
    public AttendanceRecordDto updateAttendanceRecord(@RequestParam String id, @RequestBody AttendanceRecordDto attendanceRecordDto) {
        return attendanceRecordService.updateAttendanceRecord(id, attendanceRecordDto);
    }

    @GetMapping("/event/{eventId}")
    public List<AttendanceRecordDto> getAttendanceRecordsByEventId(@RequestParam String eventId) {
        return attendanceRecordService.getAttendanceRecordsByEventId(eventId);
    }
}

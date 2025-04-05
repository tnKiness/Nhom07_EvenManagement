package com.example.events.services.attendance;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.events.services.attendance.business.AttendanceRecordService;
import com.example.events.services.attendance.persistence.AttendanceRecordDto;

@RestController
@RequestMapping("/api/attendance")
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
    public AttendanceRecordDto getAttendanceRecordById(@PathVariable("id") String id) {
        return attendanceRecordService.getAttendanceRecordById(id);
    }

    @PutMapping("/{id}")
    public AttendanceRecordDto updateAttendanceRecord(@PathVariable("id") String id, @RequestBody AttendanceRecordDto attendanceRecordDto) {
        return attendanceRecordService.updateAttendanceRecord(id, attendanceRecordDto);
    }

    @GetMapping("/event/{eventId}")
    public List<AttendanceRecordDto> getAttendanceRecordsByEventId(@PathVariable("eventId") String eventId) {
        return attendanceRecordService.getAttendanceRecordsByEventId(eventId);
    }

    @GetMapping("/user/{userId}")
    public List<AttendanceRecordDto> getAttendanceRecordsByUserId(@PathVariable("userId") String userId) {
        return attendanceRecordService.getAttendanceRecordsByUserId(userId);
    }
}

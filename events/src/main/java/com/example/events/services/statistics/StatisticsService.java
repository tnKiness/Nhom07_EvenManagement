package com.example.events.services.statistics;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.events.services.attendance.business.AttendanceRecordService;
import com.example.events.services.event.business.EventService;
import com.example.events.services.feedback.business.FeedbackService;
import com.example.events.services.user.business.UserService;

@Service
public class StatisticsService {
    
    @Autowired
    private UserService userService;

    @Autowired
    private EventService eventService;

    @Autowired
    private AttendanceRecordService attendanceRecordService;

    @Autowired
    private FeedbackService feedbackService;

    public Map<String, Integer> getStatistics() {
        Map<String, Integer> stats = Map.of(
            "totalUsers", userService.getAllUsers().size(),
            "totalEvents", eventService.getAllEvents().size(),
            "totalAttendance", attendanceRecordService.getAllAttendanceRecords().size(),
            "totalFeedbacks", feedbackService.getAllFeedbacks().size()
        );
        return stats;
    }
}

package com.example.events.services.event;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.events.services.event.business.EventService;
import com.example.events.services.event.persistence.EventDto;

@RestController
@RequestMapping("/api/event")
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping(consumes = { "multipart/form-data" })
    public EventDto addEvent(@RequestPart("image") MultipartFile image, @RequestPart("data") EventDto eventDto) {
        return eventService.addEvent(image, eventDto);
    }

    @GetMapping
    public List<EventDto> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/{id}")
    public EventDto getEventById(@PathVariable("id") String id) {
        return eventService.getEventById(id);
    }

    @PutMapping(path = "/{id}", consumes = { "multipart/form-data" })
    public EventDto updateEvent(@PathVariable("id") String id, @RequestPart(name = "image", required = false) MultipartFile image, @RequestPart("data") EventDto eventDto) {
        return eventService.updateEvent(id, image, eventDto);
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable("id") String id) {
        eventService.deleteEvent(id);
    }

    @GetMapping("/by-category/{category}")
    public List<EventDto> searchEventsByCategory(@PathVariable("category") String category) {
        return eventService.getEventsByCategory(category);
    }
}

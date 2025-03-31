package com.example.events.services.event.business;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.events.services.category.persistence.Category;
import com.example.events.services.category.persistence.CategoryRepository;
import com.example.events.services.cloudinary.CloudinaryService;
import com.example.events.services.event.persistence.Event;
import com.example.events.services.event.persistence.EventDto;
import com.example.events.services.event.persistence.EventRepository;
import com.example.events.util.helper.DateTimeParser;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventMapper eventMapper;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    public EventDto addEvent(MultipartFile image, EventDto eventDto) {
        Map<?, ?> uploadResult = cloudinaryService.upload(image);
        System.out.println(uploadResult);
        eventDto.setImage(uploadResult.get("url").toString());

        Event event = eventMapper.toEntity(eventDto);
        Optional<Category> categoryDb = categoryRepository.findById(eventDto.getCategory());

        if (categoryDb.isPresent()) {
            event.setCategory(categoryDb.get());
            eventRepository.save(event);
        } else {
            throw new RuntimeException("Category not found");
        }
        return eventDto;
    }

    public List<EventDto> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return events.stream().map(eventMapper::toDto).collect(Collectors.toList());
    }

    public EventDto getEventById(String id) {
        Event event = eventRepository.findById(id).orElse(null);
        return eventMapper.toDto(event);
    }

    public EventDto updateEvent(String id, MultipartFile image, EventDto eventDto) {
        Optional<Event> eventDb = eventRepository.findById(id);

        if (eventDb.isPresent()) {
            Event updatedEvent = eventDb.get();

            updatedEvent.setName(eventDto.getName());
            updatedEvent.setDescription(eventDto.getDescription());

            if (image != null) {
                Map<?, ?> uploadResult = cloudinaryService.upload(image);
                eventDto.setImage((String)uploadResult.get("secure_url"));
            }
            
            updatedEvent.setImage(eventDto.getImage());
            updatedEvent.setStartDate(DateTimeParser.toLocalDateTime(eventDto.getStartDate()));
            updatedEvent.setEndDate(DateTimeParser.toLocalDateTime(eventDto.getEndDate()));
            updatedEvent.setLocation(eventDto.getLocation());
            updatedEvent.setCapacity(eventDto.getCapacity());

            Optional<Category> categoryDb = categoryRepository.findById(eventDto.getCategory());
            if (categoryDb.isPresent()) {
                updatedEvent.setCategory(categoryDb.get());
                eventRepository.save(updatedEvent);
            } else {
                throw new RuntimeException("Category not found");
            }
            return eventDto;
        } else {
            throw new RuntimeException("Event not found with id: " + id);
        }
    }

    public void deleteEvent(String id) {
        Optional<Event> eventDb = eventRepository.findById(id);

        if (eventDb.isPresent()) {
            eventRepository.delete(eventDb.get());
        } else {
            throw new RuntimeException("Event not found with id: " + id);
        }
    }

    public List<EventDto> getEventsByCategory(String categoryId) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        if (category != null) {
            List<Event> events = eventRepository.findByCategory(category);
            return events.stream().map(eventMapper::toDto).collect(Collectors.toList());
        } else {
            throw new RuntimeException("Category not found with id: " + categoryId);
        }
    }
}

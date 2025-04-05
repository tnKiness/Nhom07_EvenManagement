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
        // Tải hình ảnh lên Cloudinary và lấy URL
        String imageUrl = Optional.ofNullable(image)
                .map(file -> cloudinaryService.upload(file))
                .map(uploadResult -> uploadResult.get("secure_url").toString())
                .orElseThrow(() -> new RuntimeException("Image upload failed"));
    
        eventDto.setImage(imageUrl);
    
        // Chuyển đổi EventDto thành Event entity
        Event event = eventMapper.toEntity(eventDto);
    
        // Tìm danh mục từ repository
        Category category = categoryRepository.findById(eventDto.getCategory())
                .orElseThrow(() -> new RuntimeException("Category not found"));
    
        event.setCategory(category);
    
        // Lưu Event vào cơ sở dữ liệu
        eventRepository.save(event);
    
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
        // Tìm Event theo id
        Event updatedEvent = eventRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
    
        // Cập nhật thông tin sự kiện
        updatedEvent.setName(eventDto.getName());
        updatedEvent.setDescription(eventDto.getDescription());
    
        // Cập nhật hình ảnh nếu có
        if (image != null) {
            Map<?, ?> uploadResult = cloudinaryService.upload(image);
            eventDto.setImage((String) uploadResult.get("secure_url"));
        }
    
        updatedEvent.setImage(eventDto.getImage());
        updatedEvent.setStartDate(DateTimeParser.toLocalDateTime(eventDto.getStartDate()));
        updatedEvent.setEndDate(DateTimeParser.toLocalDateTime(eventDto.getEndDate()));
        updatedEvent.setLocation(eventDto.getLocation());
        updatedEvent.setCapacity(eventDto.getCapacity());
    
        // Cập nhật thông tin danh mục
        Category category = categoryRepository.findById(eventDto.getCategory())
            .orElseThrow(() -> new RuntimeException("Category not found"));
    
        updatedEvent.setCategory(category);
    
        // Lưu cập nhật
        eventRepository.save(updatedEvent);
    
        return eventDto;
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
        // Tìm Category theo categoryId
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
        
        // Nếu Category tồn tại
        if (categoryOptional.isEmpty()) {
            throw new RuntimeException("Không tìm thấy Category với id: " + categoryId);
        }
    
        Category category = categoryOptional.get();
        
        // Lấy danh sách Events dựa trên Category
        List<Event> events = eventRepository.findByCategory(category);
    
        // Chuyển danh sách Event thành danh sách EventDto
        return events.stream()
                     .map(eventMapper::toDto)
                     .collect(Collectors.toList());
    }
}

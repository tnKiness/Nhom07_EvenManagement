package com.example.events.services.event.business;

import org.springframework.stereotype.Component;

import com.example.events.services.event.persistence.Event;
import com.example.events.services.event.persistence.EventDto;
import com.example.events.util.helper.DateTimeParser;

@Component
public class EventMapper {
    public EventDto toDto(Event event) {
        EventDto eventDto = new EventDto(
            event.getName(),
            event.getDescription(),
            DateTimeParser.fromLocalDateTime(event.getStartDate()),
            DateTimeParser.fromLocalDateTime(event.getEndDate()),
            event.getLocation(),
            event.getCapacity(),
            event.getCategory().getId()
        );
        eventDto.setId(event.getId());
        eventDto.setImage(event.getImage());
        return eventDto;
    }

    public Event toEntity(EventDto eventDto) {
        Event event = new Event(
            eventDto.getName(),
            eventDto.getDescription(),
            eventDto.getImage(),
            DateTimeParser.toLocalDateTime(eventDto.getStartDate()),
            DateTimeParser.toLocalDateTime(eventDto.getEndDate()),
            eventDto.getLocation(),
            eventDto.getCapacity(),
            null // set in service
        );
        event.setId(eventDto.getId());
        return event;
    }
}

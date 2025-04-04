package com.example.events.services.category.persistence;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CategoryDto {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String id;

    private String name;
    private String slug;

    public CategoryDto() { }

    public CategoryDto(String name, String slug) {
        this.id = "";
        this.name = name;
        this.slug = slug;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }
}

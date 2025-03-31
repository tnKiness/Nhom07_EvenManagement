package com.example.events.services.category.persistence;

import org.springframework.data.annotation.Id;

public class Category {
    
    @Id
    private String id;

    private String name;
    private String slug;

    public Category() { }

    public Category(String name, String slug) {
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

    @Override
    public String toString() {
        return "Category [id=" + id + ", name=" + name + ", slug=" + slug + "]";
    }
}

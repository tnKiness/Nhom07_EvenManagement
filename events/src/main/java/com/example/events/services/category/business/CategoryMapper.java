package com.example.events.services.category.business;

import org.springframework.stereotype.Component;

import com.example.events.services.category.persistence.Category;
import com.example.events.services.category.persistence.CategoryDto;

@Component
public class CategoryMapper {
    public CategoryDto toDto(Category category) {
        CategoryDto categoryDto = new CategoryDto(category.getName(), category.getSlug());
        categoryDto.setId(category.getId());
        return categoryDto;
    }

    public Category toEntity(CategoryDto categoryDto) {
        Category category = new Category(categoryDto.getName(), categoryDto.getSlug());
        category.setId(categoryDto.getId());
        return category;
    }
}

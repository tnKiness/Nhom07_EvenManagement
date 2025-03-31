package com.example.events.services.category.business;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.events.services.category.persistence.Category;
import com.example.events.services.category.persistence.CategoryRepository;

@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryMapper categoryMapper;

    public CategoryDto addCategory(CategoryDto categoryDto) {
        Category category = categoryMapper.toEntity(categoryDto);
        categoryRepository.save(category);
        return categoryDto;
    }

    public List<CategoryDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map(categoryMapper::toDto).collect(Collectors.toList());
    }

    public CategoryDto getCategoryById(String id) {
        Category category = categoryRepository.findById(id).orElse(null);
        return categoryMapper.toDto(category);
    } 

    public CategoryDto updateCategory(String id, CategoryDto categoryDto) {
        Optional<Category> categoryDb = categoryRepository.findById(id);

        if (categoryDb.isPresent()) {
            Category updatedCategory = categoryDb.get();

            updatedCategory.setName(categoryDto.getName());
            updatedCategory.setSlug(categoryDto.getSlug());

            categoryRepository.save(updatedCategory);
            return categoryDto;
        } else {
            throw new RuntimeException("Category not found with id: " + id);
        }
    }

    public void deleteCategory(String id) {
        Optional<Category> categoryDb = categoryRepository.findById(id);

        if (categoryDb.isPresent()) {
            categoryRepository.delete(categoryDb.get());
        } else {
            throw new RuntimeException("Category not found with id: " + id);
        }
    }
}

package com.library.management.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    @JsonProperty("book_id")
    private Integer bookId;

    @Column(nullable = false, unique = true)
    private String isbn;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(name = "type_id", nullable = false)
    @JsonProperty("type_id")
    private Integer typeId;

    @Column(nullable = false)
    private String status = "Available";

    @Column(nullable = false)
    private String language = "English";

    @Column(name = "cover_image_url")
    @JsonProperty("cover_image_url")
    private String coverImageUrl;

    // Default constructor needed by JPA
    public Book() {
    }

    public Book(String isbn, String title, String author, Integer typeId, String status, String language, String coverImageUrl) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.typeId = typeId;
        this.status = status;
        this.language = language;
        this.coverImageUrl = coverImageUrl;
    }

    // Getters and Setters
    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Integer getTypeId() {
        return typeId;
    }

    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCoverImageUrl() {
        return coverImageUrl;
    }

    public void setCoverImageUrl(String coverImageUrl) {
        this.coverImageUrl = coverImageUrl;
    }
}


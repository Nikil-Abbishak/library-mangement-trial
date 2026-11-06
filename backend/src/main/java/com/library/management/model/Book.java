package com.library.management.model;

import com.fasterxml.jackson.annotation.JsonProperty;

// Plain Java class - no JPA/Hibernate annotations needed with JDBC Template
public class Book {

    @JsonProperty("book_id")
    private Integer bookId;

    private String isbn;
    private String title;
    private String author;

    @JsonProperty("type_id")
    private Integer typeId;

    private String status;
    private String language;

    @JsonProperty("cover_image_url")
    private String coverImageUrl;

    // Default constructor
    public Book() {
    }

    // Getters and Setters
    public Integer getBookId() { return bookId; }
    public void setBookId(Integer bookId) { this.bookId = bookId; }

    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public Integer getTypeId() { return typeId; }
    public void setTypeId(Integer typeId) { this.typeId = typeId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getCoverImageUrl() { return coverImageUrl; }
    public void setCoverImageUrl(String coverImageUrl) { this.coverImageUrl = coverImageUrl; }
}

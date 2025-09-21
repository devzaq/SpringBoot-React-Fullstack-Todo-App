package com.dz.todo.backend.api.demo.todo;

import java.time.LocalDate;

public class Todo {

    private Integer id;
    private String username;
    private String description;
    private LocalDate targetDate;
    private Boolean done;

    public Todo() {
    }

    public Todo(Integer id, String username, String description, LocalDate targetDate,Boolean done) {
        this.id = id;
        this.username = username;
        this.description = description;
        this.done = done;
        this.targetDate = targetDate;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getDone() {
        return done;
    }

    public void setDone(Boolean done) {
        this.done = done;
    }

    public LocalDate getTargetDate() {
        return targetDate;
    }

    public void setTargetDate(LocalDate targetDate) {
        this.targetDate = targetDate;
    }

    @Override
    public String toString() {
        return "TodoBean{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", description='" + description + '\'' +
                ", done=" + done +
                ", targetDate=" + targetDate +
                '}';
    }
}

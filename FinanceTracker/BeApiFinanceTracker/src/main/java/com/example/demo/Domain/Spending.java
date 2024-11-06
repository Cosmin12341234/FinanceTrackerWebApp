package com.example.demo.Domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Table
@Entity
public class Spending {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    private BigDecimal amount;
    private String location;
    private LocalDateTime date; // Changed from String to LocalDateTime
    private String category;

    public Spending(Long id, User user, BigDecimal amount, String location, LocalDateTime date, String category) {
        this.id = id;
        this.user = user;
        this.amount = amount;
        this.location = location;
        this.date = date;
        this.category = category;
    }

    public Spending() {
    }

    public Spending(User user, BigDecimal amount, String location, LocalDateTime date, String category) {
        this.user = user;
        this.amount = amount;
        this.location = location;
        this.date = date;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "Spending{" +
                "id=" + id +
                ", user=" + user +
                ", amount=" + amount +
                ", location='" + location + '\'' +
                ", date=" + date +
                ", category='" + category + '\'' +
                '}';
    }
}
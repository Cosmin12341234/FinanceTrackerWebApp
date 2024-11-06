package com.example.demo.Domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "app_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Spending> spendings;

    public User(Long id, String username, String password, List<Spending> spendings) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.spendings = spendings;
    }

    public User(String username, String password, List<Spending> spendings) {
        this.username = username;
        this.password = password;
        this.spendings = spendings;
    }

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Spending> getSpendings() {
        return spendings;
    }

    public void setSpendings(List<Spending> spendings) {
        this.spendings = spendings;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", spendings=" + spendings +
                '}';
    }
}
package com.example.demo.Controllers;

import com.example.demo.Domain.Spending;
import com.example.demo.Service.SpendingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/spendings")
public class SpendingController {

    @Autowired
    private SpendingService spendingService;

    @GetMapping
    public List<Spending> getAllSpendings() {
        return spendingService.getAllSpendings();
    }

    @PostMapping
    public Spending createSpending(@RequestBody Spending spending) {
        return spendingService.saveSpending(spending);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSpending(@PathVariable Long id) {
        spendingService.deleteSpendingById(id);
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping("/all")
    public ResponseEntity<Void> deleteAllSpendings() {
        spendingService.deleteAllSpendings();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public List<Spending> getSpendingsByUserId(@PathVariable Long userId) {
        return spendingService.getSpendingsByUserId(userId);
    }
}
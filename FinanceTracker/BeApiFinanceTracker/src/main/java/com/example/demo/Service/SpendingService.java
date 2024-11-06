package com.example.demo.Service;

import com.example.demo.Domain.Spending;
import com.example.demo.Repo.SpendingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpendingService {

    @Autowired
    private SpendingRepository spendingRepository;

    public List<Spending> getAllSpendings() {
        return spendingRepository.findAll();
    }

    public Spending getSpendingById(Long id) {
        return spendingRepository.findById(id).orElse(null);
    }

    public Spending saveSpending(Spending spending) {
        return spendingRepository.save(spending);
    }

    public void deleteSpendingById(Long id) {
        spendingRepository.deleteById(id);
    }

    public void deleteAllSpendings() {
        spendingRepository.deleteAll();
    }

    public List<Spending> getSpendingsByUserId(Long userId) {
        return spendingRepository.findByUserId(userId);
    }
}
package com.example.demo.Repo;

import com.example.demo.Domain.Spending;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpendingRepository extends JpaRepository<Spending,Long> {
    @Query("SELECT s FROM Spending s WHERE s.user.id = :userId ORDER BY s.date DESC")
    List<Spending> findByUserId(Long userId);

}

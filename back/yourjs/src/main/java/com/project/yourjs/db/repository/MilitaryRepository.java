package com.project.yourjs.db.repository;

import com.project.yourjs.db.entity.Military;
import com.project.yourjs.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MilitaryRepository extends JpaRepository<Military, Long> {
    Military findMilitariesByUser(User user);

    List<Military> findAllByUser(User user);
}

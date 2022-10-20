package com.project.yourjs.db.repository;

import com.project.yourjs.db.entity.Military;
import com.project.yourjs.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MilitaryRepository extends JpaRepository<Military, Long> {
    Military findMilitariesByUser(User user);
}

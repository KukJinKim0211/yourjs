package com.project.yourjs.db.repository;

import com.project.yourjs.db.entity.Graduate;
import com.project.yourjs.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GraduateRepository extends JpaRepository<Graduate, Long> {
    List<Graduate> findAllByUser(User user);
}

package com.project.yourjs.db.repository;

import com.project.yourjs.db.entity.Graduate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GraduateRepository extends JpaRepository<Graduate, Long> {
}

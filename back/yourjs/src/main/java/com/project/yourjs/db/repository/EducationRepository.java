package com.project.yourjs.db.repository;

import com.project.yourjs.db.entity.Education;
import com.project.yourjs.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EducationRepository extends JpaRepository<Education, Long> {
    List<Education> findAllByUser(User user);
}

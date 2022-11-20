package com.project.yourjs.db.repository;

import com.project.yourjs.db.entity.Award;
import com.project.yourjs.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AwardRepository extends JpaRepository<Award, Long> {
    List<Award> findAllByUser(User user);
}

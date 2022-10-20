package com.project.yourjs.db.repository;


import com.project.yourjs.db.entity.Career;
import com.project.yourjs.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CareerRepository extends JpaRepository<Career, Long> {
    List<Career> findAllByUser(User user);
}

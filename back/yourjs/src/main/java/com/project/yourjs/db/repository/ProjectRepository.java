package com.project.yourjs.db.repository;

import com.project.yourjs.db.entity.Project;
import com.project.yourjs.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByUser(User user);
}

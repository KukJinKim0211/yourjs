package com.project.yourjs.db.repository;

import com.project.yourjs.db.entity.Subject;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.entity.UserSubject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserSubjectRepository extends JpaRepository<UserSubject, Long> {
    List<UserSubject> findAllByUser(Optional<User> byUserId);

    UserSubject findByUser(User byUserId);

    List<UserSubject> findAllBySubject(Subject subject);

    void deleteAllByUser(Optional<User> byUserId);
}

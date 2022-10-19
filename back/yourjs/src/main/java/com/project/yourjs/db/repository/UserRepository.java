package com.project.yourjs.db.repository;

import com.project.yourjs.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    int countByUserId(String userId);
    int countByNickname(String nickname);

    User findUserByUserId(String userId);
    User findUserByNickname(String nickname);
}

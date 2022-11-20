package com.project.yourjs.db.repository;

import com.project.yourjs.db.entity.Follow;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends MongoRepository<Follow, String> {
    Optional<Follow> findByRequestUserIdIsAndResponseUserId(String requestUserId, String responseUserId);
    List<Follow> findAllByRequestUserId(String requestUserId);
}

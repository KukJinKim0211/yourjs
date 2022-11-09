package com.project.yourjs.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.yourjs.db.entity.IntroTag;

public interface SelfIntroTagRepository extends JpaRepository<IntroTag, Integer>{
    Optional<List<IntroTag>> findAllByIntroSeq(Integer introSeq);
    void deleteAllByIntroSeq(Integer introSeq);
}

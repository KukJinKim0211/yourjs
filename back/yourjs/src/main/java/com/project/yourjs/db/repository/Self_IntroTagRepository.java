package com.project.yourjs.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.yourjs.db.entity.IntroTag;

public interface Self_IntroTagRepository extends JpaRepository<IntroTag, Integer>{
    List<IntroTag> findAllByIntroSeq(Integer introSeq);
    void deleteAllByIntroSeq(Integer introSeq);
}

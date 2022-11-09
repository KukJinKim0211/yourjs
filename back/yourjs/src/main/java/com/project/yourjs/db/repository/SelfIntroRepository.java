package com.project.yourjs.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.yourjs.db.entity.Notice;
import com.project.yourjs.db.entity.SelfIntro;

public interface SelfIntroRepository extends JpaRepository<SelfIntro, Integer>{
    Optional<SelfIntro> findByIntroSeq(Integer introSeq);
    Optional<List<SelfIntro>> findAllByNotice(Notice notice);
}

package com.project.yourjs.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.yourjs.db.entity.Self_Intro;

public interface Self_IntroRepository extends JpaRepository<Self_Intro, Integer>{
    Self_Intro findByIntroSeq(Integer introSeq);
}

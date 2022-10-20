package com.project.yourjs.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.yourjs.db.entity.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Long>{
  
}

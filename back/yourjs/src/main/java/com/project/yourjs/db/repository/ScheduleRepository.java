package com.project.yourjs.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.yourjs.db.entity.Schedule;

public interface ScheduleRepository extends JpaRepository <Schedule, Integer>{ 
    List<Schedule> findAllByNoticeSeq(Integer noticeSeq);  
    void deleteAllByNoticeSeq(Integer noticeSeq); 
}

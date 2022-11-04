package com.project.yourjs.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.yourjs.db.entity.NoticeTag;

public interface NoticeTagRepository extends JpaRepository <NoticeTag, Integer> {
    List<NoticeTag> findAllByNoticeSeq(Integer noticeSeq);
    void deleteAllByNoticeSeq(Integer noticeSeq);
}

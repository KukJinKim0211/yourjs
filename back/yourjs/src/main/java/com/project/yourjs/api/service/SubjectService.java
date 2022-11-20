package com.project.yourjs.api.service;

import java.util.*;

import javax.transaction.Transactional;

import com.project.yourjs.api.res.Portfolio.Subject.SubjectUserRes;
import com.project.yourjs.db.entity.Notice;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.entity.UserSubject;
import com.project.yourjs.db.repository.NoticeRepository;
import com.project.yourjs.db.repository.UserRepository;
import org.springframework.stereotype.Service;

import com.project.yourjs.db.entity.Subject;
import com.project.yourjs.db.repository.SubjectRepository;
import com.project.yourjs.db.repository.UserSubjectRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SubjectService {

    private final SubjectRepository subjectRepository;
    private final UserSubjectRepository userSubjectRepository;
    private final UserRepository userRepository;
    private final NoticeRepository noticeRepository;
    private final NoticeService noticeService;


    @Transactional
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    public List<SubjectUserRes> getAllSubjectUsers(String userId) {
        User user = userRepository.findByUserId(userId).get();
        Subject subject = userSubjectRepository.findByUser(user).getSubject();
        if (subject == null) {
            return null;
        }
        List<UserSubject> userSubjects = userSubjectRepository.findAllBySubject(subject);
        if (userSubjects == null) {
            return null;
        }
        List<User> users = new ArrayList<>();
        for (UserSubject userSubject : userSubjects) {
            users.add(userSubject.getUser());
        }
        if (users.size() == 0) {
            return null;
        }
        List<SubjectUserRes> subjectUserResList = new ArrayList<>();
        for (User tempUser : users) {
            if (tempUser.getUserId().equals(userId)) {
                continue;
            }
//            int cnt = noticeRepository.countAllByUser(tempUser);
            int cnt = 0;
            List<Notice> notices = noticeRepository.findAllByUser(tempUser);
            for (Notice notice : notices) {
                if (noticeService.getScheduleByNoticeSeqWithDate(notice.getNoticeSeq()) != null) {
                    cnt += 1;
                }
            }

            if (cnt == 0) {
                continue;
            }
            if (tempUser.getInfoLevel() != null && tempUser.getInfoLevel() < 3) {
                SubjectUserRes subjectUserRes = new SubjectUserRes(
                        tempUser.getUserSeq(),
                        tempUser.getUserId(),
                        tempUser.getUserName(),
                        tempUser.getNickname(),
                        tempUser.getInfoLevel(),
                        tempUser.getUserImg(),
                        cnt
                );
                subjectUserResList.add(subjectUserRes);
            }
        }
        if (subjectUserResList.size() > 9) {
            int MAX_SHOW = 9;
            int i = 0;
            Set set = new HashSet<Integer>();
            while (true) {
                if (set.size() >= MAX_SHOW) {
                    break;
                }
                set.add((int) Math.random() * (subjectUserResList.size()-1));
            }
            List<SubjectUserRes> realRes = new ArrayList<>();
            Iterator iter = set.iterator();
            while (iter.hasNext()) {
                realRes.add(subjectUserResList.get((int) iter.next()));
            }
            return realRes;
        }
        return subjectUserResList;
    }
}

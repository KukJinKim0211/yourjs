package com.project.yourjs.api.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import com.project.yourjs.api.res.Portfolio.Subject.SubjectUserRes;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.entity.UserSubject;
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


    @Transactional
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    public List<SubjectUserRes> getAllSubjectUsers(String userId) {
        User user = userRepository.findByUserId(userId).get();
        Subject subject = userSubjectRepository.findByUser(user).getSubject();
        List<UserSubject> userSubjects = userSubjectRepository.findAllBySubject(subject);
        List<User> users = new ArrayList<>();
        for (UserSubject userSubject : userSubjects) {
            users.add(userSubject.getUser());
        }
        List<SubjectUserRes> subjectUserResList = new ArrayList<>();
        for (User tempUser : users) {
            if (tempUser.getUserId().equals(userId)) {
                continue;
            }
            if (tempUser.getInfoLevel() != null && tempUser.getInfoLevel() < 3) {
                SubjectUserRes subjectUserRes = new SubjectUserRes(
                        tempUser.getUserSeq(),
                        tempUser.getUserId(),
                        tempUser.getUserName(),
                        tempUser.getNickname(),
                        tempUser.getInfoLevel(),
                        tempUser.getUserImg()
                );
                subjectUserResList.add(subjectUserRes);
            }
        }
        return subjectUserResList;
    }
}

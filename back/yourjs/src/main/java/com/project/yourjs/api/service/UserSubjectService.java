package com.project.yourjs.api.service;

import com.project.yourjs.api.req.User.UserSubjectPostReq;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.entity.UserSubject;
import com.project.yourjs.db.repository.SubjectRepository;
import com.project.yourjs.db.repository.UserRepository;
import com.project.yourjs.db.repository.UserSubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserSubjectService {

    private final UserSubjectRepository userSubjectRepository;
    private final SubjectRepository subjectRepository;
    private final UserRepository userRepository;


    @Transactional
    public List<UserSubject> getAllUserSubjects(String userId) {
        return userSubjectRepository.findAllByUser(userRepository.findByUserId(userId));
    }

    @Transactional
    public boolean postUserSubjects(String userId, UserSubjectPostReq userSubjectPostReq) {
        userSubjectRepository.deleteAllByUser(userRepository.findByUserId(userId));
        String[] parsedStr = userSubjectPostReq.getSubjectsStr().split(",");
        User user = userRepository.findByUserId(userId).get();
        for (String seq : parsedStr) {
            UserSubject userSubject = new UserSubject();
            userSubject.setUser(user);
            userSubject.setSubject(subjectRepository.findById(Long.parseLong(seq)).get());
            userSubjectRepository.save(userSubject);
        }
        return true;
    }
}

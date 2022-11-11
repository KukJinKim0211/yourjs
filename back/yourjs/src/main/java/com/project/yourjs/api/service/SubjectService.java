package com.project.yourjs.api.service;

import java.util.List;

import javax.transaction.Transactional;

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


    @Transactional
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

}

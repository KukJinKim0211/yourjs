package com.project.yourjs.api.service;

import com.project.yourjs.api.req.Portfolio.Career.CareerDeleteReq;
import com.project.yourjs.api.req.Portfolio.Career.CareerPostReq;
import com.project.yourjs.api.req.Portfolio.Education.EducationDeleteReq;
import com.project.yourjs.api.req.Portfolio.Education.EducationPostReq;
import com.project.yourjs.api.res.*;
import com.project.yourjs.api.res.Portfolio.Education.EducationDeleteRes;
import com.project.yourjs.api.res.Portfolio.Education.EducationPostRes;
import com.project.yourjs.api.res.Portfolio.Education.EducationUpdateRes;
import com.project.yourjs.common.dto.CareerDto;
import com.project.yourjs.common.dto.EducationDto;
import com.project.yourjs.db.entity.Career;
import com.project.yourjs.db.entity.Education;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.repository.CareerRepository;
import com.project.yourjs.db.repository.EducationRepository;
import com.project.yourjs.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class EducationService {

    private  final EducationRepository educationRepository;

    private final UserRepository userRepository;

    public List<EducationDto> getAllEducations(String userId){

        User user = userRepository.findByUserId(userId).get();

        List<Education> educations = educationRepository.findAllByUser(user);
        List<EducationDto> result = new ArrayList<>();

        for(Education education : educations){
            result.add(education.toDto());
        }

        return result;

    }

    @Transactional
    public EducationPostRes createEducation(String userId, EducationPostReq educationPostReq){
        EducationPostRes educationPostRes = new EducationPostRes();
        educationPostRes.setResult("success");
        Education education = educationPostReq.toEntity();
        User user = userRepository.findByUserId(userId).get();
        education.setUser(user);
        try{
            educationRepository.save(education);
        }catch (Exception e){
            educationPostRes.setResult("fail");
        }

        return educationPostRes;
    }

    @Transactional
    public EducationUpdateRes updateEducation(String userId, EducationDto educationDto){
        EducationUpdateRes educationUpdateRes = new EducationUpdateRes();
        educationUpdateRes.setResult("success");
        Education updatedEducation = educationDto.toEntity();
        User user = userRepository.findByUserId(userId).get();

        Education education = educationRepository.findById(educationDto.getEduSeq()).get();
        // 요청자와 등록자가 같은지 체크
        if(user.getUserSeq()!=education.getUser().getUserSeq()){
            educationUpdateRes.setResult("fail");
            return educationUpdateRes;
        }

        try{
            education.setEduSeq(updatedEducation.getEduSeq());
            education.setEduName(updatedEducation.getEduName());
            education.setEduContents(updatedEducation.getEduContents());
            education.setEduInstitution(updatedEducation.getEduInstitution());
            education.setEduTime(updatedEducation.getEduTime());
            education.setStartDate(updatedEducation.getStartDate());
            education.setEndDate(updatedEducation.getEndDate());
            education.setModDtm(LocalDateTime.now());
            educationRepository.save(education);
        }catch (Exception e){
            educationUpdateRes.setResult("fail");
        }

        return educationUpdateRes;
    }

    @Transactional
    public EducationDeleteRes deleteEducation(String userId, EducationDeleteReq educationDeleteReq){
        EducationDeleteRes educationDeleteRes = new EducationDeleteRes();
        educationDeleteRes.setResult("success");

        User user = userRepository.findByUserId(userId).get();
        Education education = educationRepository.findById(educationDeleteReq.getEduSeq()).get();
        // 요청자와 등록자가 같은지 체크
        if(user.getUserSeq()!=education.getUser().getUserSeq()){
            educationDeleteRes.setResult("fail");
            return educationDeleteRes;
        }

        try{
            educationRepository.deleteById(educationDeleteReq.getEduSeq());
        }catch (Exception e){
            educationDeleteRes.setResult("fail");
        }

        return educationDeleteRes;
    }
}

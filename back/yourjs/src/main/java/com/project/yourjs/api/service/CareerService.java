package com.project.yourjs.api.service;

import com.project.yourjs.api.req.CareerDeleteReq;
import com.project.yourjs.api.req.CareerPostReq;
import com.project.yourjs.api.res.CareerDeleteRes;
import com.project.yourjs.api.res.CareerPostRes;
import com.project.yourjs.api.res.CareerUpdateRes;
import com.project.yourjs.common.dto.CareerDto;
import com.project.yourjs.db.entity.Career;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.repository.CareerRepository;
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
public class CareerService {

    private  final CareerRepository careerRepository;

    private final UserRepository userRepository;


    public List<CareerDto> getAllCareers(String userId){

        User user = userRepository.findByUserId(userId).get();

        List<Career> careers = careerRepository.findAllByUser(user);
        List<CareerDto> result = new ArrayList<>();

        for(Career career : careers){
            result.add(career.toDto());
        }

        return result;

    }

    @Transactional
    public CareerPostRes createCareer(String userId, CareerPostReq careerPostReq){
        CareerPostRes careerPostRes = new CareerPostRes();
        careerPostRes.setResult("success");
        Career career = careerPostReq.toEntity();
        User user = userRepository.findByUserId(userId).get();
        career.setUser(user);
        try{
            careerRepository.save(career);
        }catch (Exception e){
            careerPostRes.setResult("fail");
        }

        return careerPostRes;
    }

    @Transactional
    public CareerUpdateRes updateCareer(String userId, CareerDto careerDto){
        CareerUpdateRes careerUpdateRes = new CareerUpdateRes();
        careerUpdateRes.setResult("success");
        Career updatedCareer = careerDto.toEntity();
        User user = userRepository.findByUserId(userId).get();

        Career career = careerRepository.findById(careerDto.getCareerSeq()).get();
        // 요청자와 등록자가 같은지 체크
        if(user.getUserSeq()!=career.getUser().getUserSeq()){
            careerUpdateRes.setResult("fail");
            return careerUpdateRes;
        }

        try{
            career.setCompany(updatedCareer.getCompany());
            career.setDepartment(updatedCareer.getDepartment());
            career.setPosition(updatedCareer.getPosition());
            career.setStartDate(updatedCareer.getStartDate());
            career.setEndDate(updatedCareer.getEndDate());
            career.setSalary(updatedCareer.getSalary());
            career.setModDtm(LocalDateTime.now());
            careerRepository.save(career);
        }catch (Exception e){
            careerUpdateRes.setResult("fail");
        }

        return careerUpdateRes;
    }

    @Transactional
    public CareerDeleteRes deleteCareer(String userId, CareerDeleteReq careerDeleteReq){
        CareerDeleteRes careerDeleteRes = new CareerDeleteRes();
        careerDeleteRes.setResult("success");

        User user = userRepository.findByUserId(userId).get();
        Career career = careerRepository.findById(careerDeleteReq.getCareerSeq()).get();
        // 요청자와 등록자가 같은지 체크
        if(user.getUserSeq()!=career.getUser().getUserSeq()){
            careerDeleteRes.setResult("fail");
            return careerDeleteRes;
        }

        try{
            careerRepository.deleteById(careerDeleteReq.getCareerSeq());
        }catch (Exception e){
            careerDeleteRes.setResult("fail");
        }

        return careerDeleteRes;
    }

}

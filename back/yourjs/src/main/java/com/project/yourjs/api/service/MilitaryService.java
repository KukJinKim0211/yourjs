package com.project.yourjs.api.service;

import com.project.yourjs.api.req.Portfolio.Military.MilitaryPostReq;
import com.project.yourjs.api.res.Portfolio.Military.MilitaryRes;
import com.project.yourjs.db.entity.Military;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.repository.MilitaryRepository;
import com.project.yourjs.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MilitaryService {

    private final MilitaryRepository militaryRepository;
    private final UserRepository userRepository;

    private Military getMilitary(Military military, String militaryType, String specialityType, Date startDate, Date endDate, String discharge) {
        military.setMilitaryType(militaryType);
        military.setSpecialityType(specialityType);
        military.setStartDate(startDate);
        military.setEndDate(endDate);
        military.setDischarge(discharge);
        militaryRepository.save(military);
        return military;
    }

    @Transactional
    public List<MilitaryRes> getAllMilitaries(String userId) {
        User user = userRepository.findByUserId(userId).get();
        List<Military> militaries = militaryRepository.findAllByUser(user);
        List<MilitaryRes> resList = new ArrayList<>();
        for (int i = 0; i < militaries.size(); i++) {
            resList.add(militaries.get(i).toDto());
        }
        return resList;
    }

    @Transactional
    public MilitaryRes createMilitary(String userId, MilitaryPostReq militaryPostReq) {
        Military military = new Military();
        military.setUser(userRepository.findByUserId(userId).get());
        getMilitary(military, militaryPostReq.getMilitaryType(), militaryPostReq.getSpecialityType(), militaryPostReq.getStartDate(), militaryPostReq.getEndDate(), militaryPostReq.getDischarge());
        return military.toDto();
    }

    @Transactional
    public MilitaryRes updateMilitary(String userId, MilitaryRes militaryRes) {
        Military military = militaryRepository.findById(militaryRes.getMilitarySeq()).get();
        if (userId.equals(military.getUser().getUserId())) {
            getMilitary(military, militaryRes.getMilitaryType(), militaryRes.getSpecialityType(), militaryRes.getStartDate(), militaryRes.getEndDate(), militaryRes.getDischarge());
            return military.toDto();
        }
        return null;
    }

    @Transactional
    public boolean deleteMilitary(String userId, Long militarySeq) {
        if (userId.equals(militaryRepository.findById(militarySeq).get().getUser().getUserId())) {
            militaryRepository.deleteById(militarySeq);
            return true;
        }
        return false;
    }
}

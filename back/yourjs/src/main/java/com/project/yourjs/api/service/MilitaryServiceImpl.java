package com.project.yourjs.api.service;

import com.project.yourjs.api.req.MilitaryPostReq;
import com.project.yourjs.api.req.MilitaryUpdateReq;
import com.project.yourjs.db.entity.Military;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.repository.MilitaryRepository;
import com.project.yourjs.db.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MilitaryServiceImpl implements MilitaryService {

    private final MilitaryRepository militaryRepository;
    private final UserRepository userRepository;

    private Military getMilitary(Military military, String militaryType, String specialityType, Date startDate, Date endDate, String fileSrc) {
        military.setMilitaryType(militaryType);
        military.setSpecialityType(specialityType);
        military.setStartDate(startDate);
        military.setEndDate(endDate);
        military.setFileSrc(fileSrc);
        militaryRepository.save(military);
        return military;
    }

    @Override
    public List<Military> getAllMilitaries(String userId) {
        User user = userRepository.findByUserId(userId).get();
        return militaryRepository.findAllByUser(user);
    }

    @Override
    public Military createMilitary(String userId, MilitaryPostReq militaryPostReq) {
        Military military = new Military();
        military.setUser(userRepository.findByUserId(userId).get());
        return getMilitary(military, militaryPostReq.getMilitaryType(), militaryPostReq.getSpecialityType(), militaryPostReq.getStartDate(), militaryPostReq.getEndDate(), militaryPostReq.getFileSrc());
    }

    @Override
    public Military updateMilitary(String userId, MilitaryUpdateReq militaryUpdateReq) {
        Military military = militaryRepository.findById(militaryUpdateReq.getMilitarySeq()).get();
        return getMilitary(military, militaryUpdateReq.getMilitaryType(), militaryUpdateReq.getSpecialityType(), militaryUpdateReq.getStartDate(), militaryUpdateReq.getEndDate(), militaryUpdateReq.getFileSrc());
    }

    @Override
    public boolean deleteMilitary(String userId, Military military) {
        if (userId.equals(military.getUser().getUserId())) {
            militaryRepository.deleteById(military.getMilitarySeq());
            return true;
        }
        return false;
    }
}

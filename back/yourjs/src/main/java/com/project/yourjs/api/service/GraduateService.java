package com.project.yourjs.api.service;

import com.project.yourjs.api.req.GraduatePostReq;
import com.project.yourjs.api.res.GraduateRes;
import com.project.yourjs.db.entity.Graduate;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.repository.GraduateRepository;
import com.project.yourjs.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GraduateService {

    private final GraduateRepository graduateRepository;
    private final UserRepository userRepository;

    private Graduate getGraduate(Graduate graduate, String schoolName, String location, String totAvgCredit, String majorAvgCredit, String totCredit, String majorCredit, String majorName, String doubleMajorName, Date startDate, Date endDate, String fileSrc) {
        graduate.setSchoolName(schoolName);
        graduate.setLocation(location);
        graduate.setTotAvgCredit(totAvgCredit);
        graduate.setMajorAvgCredit(majorAvgCredit);
        graduate.setTotCredit(totCredit);
        graduate.setMajorCredit(majorCredit);
        graduate.setMajorName(majorName);
        graduate.setDoubleMajorName(doubleMajorName);
        graduate.setStartDate(startDate);
        graduate.setEndDate(endDate);
        graduate.setFileSrc(fileSrc);
        graduateRepository.save(graduate);
        return graduate;
    }

    @Transactional
    public List<GraduateRes> getAllGraduates(String userId) {
        User user = userRepository.findByUserId(userId).get();
        List<Graduate> graduates = graduateRepository.findAllByUser(user);
        List<GraduateRes> resList = new ArrayList<>();
        for (int i = 0; i < graduates.size(); i++) {
            resList.add(graduates.get(i).toDto());
        }
        return resList;
    }

    @Transactional
    public GraduateRes createGraduate(String userId, GraduatePostReq graduatePostReq) {
        Graduate graduate = new Graduate();
        graduate.setUser(userRepository.findByUserId(userId).get());
        getGraduate(graduate, graduatePostReq.getSchoolName(), graduatePostReq.getLocation(), graduatePostReq.getTotAvgCredit(), graduatePostReq.getMajorAvgCredit(), graduatePostReq.getTotCredit(), graduatePostReq.getMajorCredit(), graduatePostReq.getMajorName(), graduatePostReq.getDoubleMajorName(), graduatePostReq.getStartDate(), graduatePostReq.getEndDate(), graduatePostReq.getFileSrc());
        return graduate.toDto();
    }

    @Transactional
    public GraduateRes updateGraduate(String userId, @Valid GraduateRes graduateRes) {
        Graduate graduate = graduateRepository.findById(graduateRes.getGraduateSeq()).get();
        if (userId.equals(graduate.getUser().getUserId())) {
            getGraduate(graduate, graduateRes.getSchoolName(), graduateRes.getLocation(), graduateRes.getTotAvgCredit(), graduateRes.getMajorAvgCredit(), graduateRes.getTotCredit(), graduateRes.getMajorCredit(), graduateRes.getMajorName(), graduateRes.getDoubleMajorName(), graduateRes.getStartDate(), graduateRes.getEndDate(), graduateRes.getFileSrc());
            return graduate.toDto();
        }
        return null;
    }

    @Transactional
    public boolean deleteGraduate(String userId, @Valid Long graduateSeq) {
        if (userId.equals(graduateRepository.findById(graduateSeq).get().getUser().getUserId())) {
            graduateRepository.deleteById(graduateSeq);
            return true;
        }
        return false;
    }
}

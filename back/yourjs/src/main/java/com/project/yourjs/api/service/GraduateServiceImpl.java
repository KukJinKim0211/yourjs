package com.project.yourjs.api.service;

import com.project.yourjs.api.req.GraduatePostReq;
import com.project.yourjs.api.req.GraduateUpdateReq;
import com.project.yourjs.db.entity.Graduate;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.repository.GraduateRepository;
import com.project.yourjs.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GraduateServiceImpl implements GraduateService {

    private final GraduateRepository graduateRepository;
    private final UserRepository userRepository;

    private Graduate getGraduate(Graduate graduate, String schoolName, String location, String degree, boolean graduateStatus, String totAvgCredit, String majorAvgCredit, String totCredit, String majorCredit, String majorName, String doubleMajorName, Date startDate, Date endDate, String fileSrc) {
        graduate.setSchoolName(schoolName);
        graduate.setLocation(location);
        graduate.setDegree(degree);
        graduate.setGraduateStatus(graduateStatus);
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

    @Override
    public List<Graduate> getAllMilitaries(String userId) {
        User user = userRepository.findByUserId(userId).get();
        return graduateRepository.findAllByUser(user);
    }

    @Override
    public Graduate createGraduate(String userId, GraduatePostReq graduatePostReq) {
        Graduate graduate = new Graduate();
        graduate.setUser(userRepository.findByUserId(userId).get());
        return getGraduate(graduate, graduatePostReq.getSchoolName(), graduatePostReq.getLocation(), graduatePostReq.getDegree(), graduatePostReq.isGraduateStatus(), graduatePostReq.getTotAvgCredit(), graduatePostReq.getMajorAvgCredit(), graduatePostReq.getTotCredit(), graduatePostReq.getMajorCredit(), graduatePostReq.getMajorName(), graduatePostReq.getDoubleMajorName(), graduatePostReq.getStartDate(), graduatePostReq.getEndDate(), graduatePostReq.getFileSrc());
    }

    @Override
    public Graduate updateGraduate(String userId, GraduateUpdateReq graduateUpdateReq) {
        Graduate graduate = graduateRepository.findById(graduateUpdateReq.getGraduateSeq()).get();
        return getGraduate(graduate, graduateUpdateReq.getSchoolName(), graduateUpdateReq.getLocation(), graduateUpdateReq.getDegree(), graduateUpdateReq.isGraduateStatus(), graduateUpdateReq.getTotAvgCredit(), graduateUpdateReq.getMajorAvgCredit(), graduateUpdateReq.getTotCredit(), graduateUpdateReq.getMajorCredit(), graduateUpdateReq.getMajorName(), graduateUpdateReq.getDoubleMajorName(), graduateUpdateReq.getStartDate(), graduateUpdateReq.getEndDate(), graduateUpdateReq.getFileSrc());
    }


    @Override
    public boolean deleteGraduate(String userId, Graduate graduate) {
        if (userId.equals(graduate.getUser().getUserId())) {
            graduateRepository.deleteById(graduate.getGraduateSeq());
            return true;
        }
        return false;
    }
}

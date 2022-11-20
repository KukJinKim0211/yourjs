package com.project.yourjs.api.service;

import com.project.yourjs.api.req.Portfolio.Award.AwardDeleteReq;
import com.project.yourjs.api.req.Portfolio.Award.AwardPostReq;
import com.project.yourjs.api.res.Portfolio.Award.AwardDeleteRes;
import com.project.yourjs.api.res.Portfolio.Award.AwardPostRes;
import com.project.yourjs.api.res.Portfolio.Award.AwardUpdateRes;
import com.project.yourjs.common.dto.AwardDto;
import com.project.yourjs.db.entity.Award;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.repository.AwardRepository;
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
public class AwardService {

    private final AwardRepository awardRepository;

    private final UserRepository userRepository;

    public List<AwardDto> getAllAwards(String userId){

        User user = userRepository.findByUserId(userId).get();

        List<Award> awards = awardRepository.findAllByUser(user);
        List<AwardDto> result = new ArrayList<>();

        for(Award award : awards){
            result.add(award.toDto());
        }

        return result;

    }

    @Transactional
    public AwardPostRes createAward(String userId, AwardPostReq awardPostReq){
        AwardPostRes awardPostRes = new AwardPostRes();
        awardPostRes.setResult("success");
        Award award = awardPostReq.toEntity();

        User user = userRepository.findByUserId(userId).get();
        award.setUser(user);
        try{
            awardRepository.save(award);
        }catch (Exception e){
            awardPostRes.setResult("fail");
        }

        return awardPostRes;
    }

    @Transactional
    public AwardUpdateRes updateAward(String userId, AwardDto awardDto){
        AwardUpdateRes awardUpdateRes = new AwardUpdateRes();
        awardUpdateRes.setResult("success");
        Award updatedAward = awardDto.toEntity();
        User user = userRepository.findByUserId(userId).get();

        Award award = awardRepository.findById(awardDto.getAwardSeq()).get();
        // 요청자와 등록자가 같은지 체크
        if(user.getUserSeq()!=award.getUser().getUserSeq()){
            awardUpdateRes.setResult("fail");
            return awardUpdateRes;
        }

        try{
            award.setAwardName(updatedAward.getAwardName());
            award.setAwardContents(updatedAward.getAwardContents());
            award.setAwardInstitution(updatedAward.getAwardInstitution());
            award.setWinDate(updatedAward.getWinDate());
            award.setModDtm(LocalDateTime.now());
            awardRepository.save(award);
        }catch (Exception e){
            awardUpdateRes.setResult("fail");
        }

        return awardUpdateRes;
    }

    @Transactional
    public AwardDeleteRes deleteAward(String userId, AwardDeleteReq awardDeleteReq){
        AwardDeleteRes awardDeleteRes = new AwardDeleteRes();
        awardDeleteRes.setResult("success");

        User user = userRepository.findByUserId(userId).get();
        Award award = awardRepository.findById(awardDeleteReq.getAwardSeq()).get();
        // 요청자와 등록자가 같은지 체크
        if(user.getUserSeq()!=award.getUser().getUserSeq()){
            awardDeleteRes.setResult("fail");
            return awardDeleteRes;
        }

        try{
            awardRepository.deleteById(awardDeleteReq.getAwardSeq());
        }catch (Exception e){
            awardDeleteRes.setResult("fail");
        }

        return awardDeleteRes;
    }


}

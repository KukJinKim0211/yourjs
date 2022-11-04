package com.project.yourjs.api.service;

import com.project.yourjs.api.req.CertificateDeleteReq;
import com.project.yourjs.api.req.CertificatePostReq;
import com.project.yourjs.api.res.CertificateDeleteRes;
import com.project.yourjs.api.res.CertificatePostRes;
import com.project.yourjs.api.res.CertificateUpdateRes;
import com.project.yourjs.common.dto.CertificateDto;
import com.project.yourjs.db.entity.Certificate;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.repository.CertificateRepository;
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
public class CertificateService {

    private  final CertificateRepository certificateRepository;
    private final UserRepository userRepository;


    public List<CertificateDto> getAllCertificates(String userId){

        User user = userRepository.findByUserId(userId).get();

        List<Certificate> certificates = certificateRepository.findAllByUser(user);
        List<CertificateDto> result = new ArrayList<>();

        for(Certificate certificate : certificates){
            result.add(certificate.toDto());
        }

        return result;

    }

    @Transactional
    public CertificatePostRes createCertificate(String userId, CertificatePostReq certificatePostReq){
        CertificatePostRes certificatePostRes = new CertificatePostRes();
        certificatePostRes.setResult("success");
        Certificate certificate = certificatePostReq.toEntity();
        User user = userRepository.findByUserId(userId).get();
        certificate.setUser(user);
        try{
            certificateRepository.save(certificate);
        }catch (Exception e){
            certificatePostRes.setResult("fail");
        }

        return certificatePostRes;
    }

    @Transactional
    public CertificateUpdateRes updateCertificate(String userId, CertificateDto certificateDto){
        CertificateUpdateRes certificateUpdateRes = new CertificateUpdateRes();
        certificateUpdateRes.setResult("success");
        Certificate updatedCertificate = certificateDto.toEntity();
        User user = userRepository.findByUserId(userId).get();

        Certificate certificate = certificateRepository.findById(certificateDto.getCertSeq()).get();
        // 요청자와 등록자가 같은지 체크
        if(user.getUserSeq()!=certificate.getUser().getUserSeq()){
            certificateUpdateRes.setResult("fail");
            return certificateUpdateRes;
        }

        try{
            certificate.setCertSeq(updatedCertificate.getCertSeq());
            certificate.setCertName(updatedCertificate.getCertName());
            certificate.setCertNum(updatedCertificate.getCertNum());
            certificate.setCertInstitution(updatedCertificate.getCertInstitution());
            certificate.setAcquisitionDate(updatedCertificate.getAcquisitionDate());
            certificate.setModDtm(LocalDateTime.now());
            certificateRepository.save(certificate);
        }catch (Exception e){
            certificateUpdateRes.setResult("fail");
        }

        return certificateUpdateRes;
    }

    @Transactional
    public CertificateDeleteRes deleteCertificate(String userId, CertificateDeleteReq certificateDeleteReq){
        CertificateDeleteRes certificateDeleteRes = new CertificateDeleteRes();
        certificateDeleteRes.setResult("success");

        User user = userRepository.findByUserId(userId).get();
        Certificate certificate = certificateRepository.findById(certificateDeleteReq.getCareerSeq()).get();
        // 요청자와 등록자가 같은지 체크
        if(user.getUserSeq()!=certificate.getUser().getUserSeq()){
            certificateDeleteRes.setResult("fail");
            return certificateDeleteRes;
        }

        try{
            certificateRepository.deleteById(certificateDeleteReq.getCareerSeq());
        }catch (Exception e){
            certificateDeleteRes.setResult("fail");
        }

        return certificateDeleteRes;
    }
}

package com.project.yourjs.api.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.project.yourjs.api.req.Self_IntroDeleteReq;
import com.project.yourjs.api.req.Self_IntroPatchReq;
import com.project.yourjs.api.req.Self_IntroPostReq;
import com.project.yourjs.api.res.Self_IntroDeleteRes;
import com.project.yourjs.api.res.Self_IntroGetRes;
import com.project.yourjs.api.res.Self_IntroPatchRes;
import com.project.yourjs.api.res.Self_IntroPostRes;
import com.project.yourjs.db.entity.IntroTag;
import com.project.yourjs.db.entity.Notice;
import com.project.yourjs.db.entity.Self_Intro;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.repository.NoticeRepository;
import com.project.yourjs.db.repository.Self_IntroRepository;
import com.project.yourjs.db.repository.Self_IntroTagRepository;
import com.project.yourjs.db.repository.UserRepository;

@Service
public class Self_IntroService {
    private final Self_IntroRepository self_IntroRepository;
    private final UserRepository userRepository;
    private final NoticeRepository noticeRepository;
    private final Self_IntroTagRepository self_IntroTagRepository;

    public Self_IntroService(Self_IntroRepository self_IntroRepository, UserRepository userRepository,
            NoticeRepository noticeRepository, Self_IntroTagRepository self_IntroTagRepository) {
        this.self_IntroRepository = self_IntroRepository;
        this.userRepository = userRepository;
        this.noticeRepository = noticeRepository;
        this.self_IntroTagRepository = self_IntroTagRepository;
    }

    public List<Self_IntroGetRes> getAllSelf_Intro(String userId) {
        List<Self_IntroGetRes> self_IntroList = new ArrayList<>();
        List<Self_Intro> allSelf_IntroList = self_IntroRepository.findAll();
        for (Self_Intro self_Intro : allSelf_IntroList) {
            if (self_Intro.getUser().getUserId().equals(userId)) {
                Self_IntroGetRes self_IntroGetRes = new Self_IntroGetRes();
                self_IntroGetRes.setQuestion(self_Intro.getQuestion());
                self_IntroGetRes.setContents(self_Intro.getContents());
                List<IntroTag> introTagList = self_IntroTagRepository.findAllByIntroSeq(self_Intro.getIntroSeq());
                if (introTagList != null) {
                    StringBuilder sb = new StringBuilder();
                    for (IntroTag tag : introTagList) {
                        sb.append(tag.getIntroTagName());
                        sb.append(", ");
                    }
                    if (sb.length() > 1)
                        sb.delete(sb.length() - 2, sb.length());
                    self_IntroGetRes.setIntroTag(sb.toString());
                }
                self_IntroList.add(self_IntroGetRes);
            }
        }
        return self_IntroList;
    }

    @Transactional
    public Self_IntroPostRes createSelf_IntroNoNotice(String userId, Self_IntroPostReq self_IntroPostReq) {
        Self_IntroPostRes self_IntroPostRes = new Self_IntroPostRes();
        self_IntroPostRes.setResult("fail");
        Self_Intro self_Intro = new Self_Intro();
        Optional<User> oUser = userRepository.findByUserId(userId);
        if (oUser.isPresent()) {
            User user = oUser.get();
            self_Intro.setUser(user);
            self_Intro.setContents(self_IntroPostReq.getContents());
            self_Intro.setModDtm(LocalDateTime.now());
            self_Intro.setQuestion(self_IntroPostReq.getQuestion());
            self_Intro.setRegDtm(LocalDateTime.now());
            self_Intro.setNotice(null);
            self_Intro = self_IntroRepository.save(self_Intro);
            String introTagList = self_IntroPostReq.getIntroTag();
            if (introTagList != null) {
                String[] tagList = introTagList.split(", ");
                for (String tag : tagList) {
                    IntroTag introTag = new IntroTag();
                    introTag.setIntroSeq(self_Intro.getIntroSeq());
                    introTag.setIntroTagName(tag);
                    self_IntroTagRepository.save(introTag);
                }
            }
            if (self_Intro != null) {
                self_IntroPostRes.setResult("success");
            }
        }
        return self_IntroPostRes;
    }

    @Transactional
    public Self_IntroPostRes createSelf_Intro(String userId, Self_IntroPostReq self_IntroPostReq) {
        Self_IntroPostRes self_IntroPostRes = new Self_IntroPostRes();
        self_IntroPostRes.setResult("fail");
        Self_Intro self_Intro = new Self_Intro();
        Optional<User> oUser = userRepository.findByUserId(userId);
        if (oUser.isPresent()) {
            Optional<Notice> oNotice = noticeRepository.findById(self_IntroPostReq.getNoticeSeq());
            if (oNotice.isPresent()) {
                User user = oUser.get();
                Notice notice = oNotice.get();
                self_Intro.setUser(user);
                self_Intro.setContents(self_IntroPostReq.getContents());
                self_Intro.setModDtm(LocalDateTime.now());
                self_Intro.setQuestion(self_IntroPostReq.getQuestion());
                self_Intro.setRegDtm(LocalDateTime.now());
                self_Intro.setNotice(notice);
                self_Intro = self_IntroRepository.save(self_Intro);
                String introTagList = self_IntroPostReq.getIntroTag();
                if (introTagList != null) {
                    String[] tagList = introTagList.split(", ");
                    for (String tag : tagList) {
                        IntroTag introTag = new IntroTag();
                        introTag.setIntroSeq(self_Intro.getIntroSeq());
                        introTag.setIntroTagName(tag);
                        self_IntroTagRepository.save(introTag);
                    }
                }
                if (self_Intro != null) {
                    self_IntroPostRes.setResult("success");
                }
            }
        }
        return self_IntroPostRes;
    }

    @Transactional
    public Self_IntroPatchRes updateSelf_Intro(String userId, Self_IntroPatchReq self_IntroPatchReq) {
        Self_IntroPatchRes self_IntroPatchRes = new Self_IntroPatchRes();
        self_IntroPatchRes.setResult("fail");
        Optional<User> oUser = userRepository.findByUserId(userId);
        if (oUser.isPresent()) {
            User user = oUser.get();
            Optional<Self_Intro> oSelf_Intro = self_IntroRepository.findById(self_IntroPatchReq.getSelfIntroSeq());
            if (oSelf_Intro.isPresent()) {
                Self_Intro self_Intro = oSelf_Intro.get();
                if (self_Intro.getUser().getUserSeq() != user.getUserSeq())
                    return self_IntroPatchRes;
                if (StringUtils.isNotBlank(self_IntroPatchReq.getContents()))
                    self_Intro.setContents(self_IntroPatchReq.getContents());
                self_Intro.setModDtm(LocalDateTime.now());
                if (StringUtils.isNotBlank(self_IntroPatchReq.getQuestion()))
                    self_Intro.setQuestion(self_IntroPatchReq.getQuestion());
                self_Intro = self_IntroRepository.save(self_Intro);
                self_IntroTagRepository.deleteAllByIntroSeq(self_Intro.getIntroSeq());
                String introTagList = self_IntroPatchReq.getIntroTag();
                if (introTagList != null) {
                    String[] tagList = introTagList.split(", ");
                    for (String tag : tagList) {
                        IntroTag introTag = new IntroTag();
                        introTag.setIntroSeq(self_Intro.getIntroSeq());
                        introTag.setIntroTagName(tag);
                        self_IntroTagRepository.save(introTag);
                    }
                }
                if (self_Intro != null) {
                    self_IntroPatchRes.setResult("success");
                }
            }
        }
        return self_IntroPatchRes;
    }

    @Transactional
    public Self_IntroDeleteRes deleteSelf_Intro(String userId, Self_IntroDeleteReq self_IntroDeleteReq) {
        Self_IntroDeleteRes self_IntroDeleteRes = new Self_IntroDeleteRes();
        self_IntroDeleteRes.setResult("fail");
        Optional<User> oUser = userRepository.findByUserId(userId);
        if (oUser.isPresent()) {
            User user = oUser.get();
            Optional<Self_Intro> oSelf_Intro = self_IntroRepository.findById(self_IntroDeleteReq.getSelfIntroSeq());
            if (oSelf_Intro.isPresent()) {
                Self_Intro self_Intro = oSelf_Intro.get();
                if (self_Intro.getUser().getUserSeq() == user.getUserSeq()) {
                    self_IntroRepository.deleteById(self_IntroDeleteReq.getSelfIntroSeq());
                    self_IntroTagRepository.deleteAllByIntroSeq(self_Intro.getIntroSeq());
                    self_IntroDeleteRes.setResult("success");
                }
            }
        }
        return self_IntroDeleteRes;
    }
}

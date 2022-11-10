package com.project.yourjs.api.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.project.yourjs.api.req.SelfIntro.SelfIntroDeleteReq;
import com.project.yourjs.api.req.SelfIntro.SelfIntroPatchReq;
import com.project.yourjs.api.req.SelfIntro.SelfIntroPostReq;
import com.project.yourjs.api.res.SelfIntro.SelfIntroDeleteRes;
import com.project.yourjs.api.res.SelfIntro.SelfIntroGetRes;
import com.project.yourjs.api.res.SelfIntro.SelfIntroPatchRes;
import com.project.yourjs.api.res.SelfIntro.SelfIntroPostRes;
import com.project.yourjs.db.entity.IntroTag;
import com.project.yourjs.db.entity.Notice;
import com.project.yourjs.db.entity.SelfIntro;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.repository.NoticeRepository;
import com.project.yourjs.db.repository.SelfIntroRepository;
import com.project.yourjs.db.repository.SelfIntroTagRepository;
import com.project.yourjs.db.repository.UserRepository;

@Service
public class SelfIntroService {
    private final SelfIntroRepository selfIntroRepository;
    private final UserRepository userRepository;
    private final NoticeRepository noticeRepository;
    private final SelfIntroTagRepository selfIntroTagRepository;

    public SelfIntroService(SelfIntroRepository selfIntroRepository, UserRepository userRepository,
            NoticeRepository noticeRepository, SelfIntroTagRepository selfIntroTagRepository) {
        this.selfIntroRepository = selfIntroRepository;
        this.userRepository = userRepository;
        this.noticeRepository = noticeRepository;
        this.selfIntroTagRepository = selfIntroTagRepository;
    }

    public List<SelfIntroGetRes> getAllSelfIntro(String userId) {
        List<SelfIntroGetRes> selfIntroList = new ArrayList<>();
        List<SelfIntro> allSelfIntroList = selfIntroRepository.findAll();
        for (SelfIntro selfIntro : allSelfIntroList) {
            if (selfIntro.getUser().getUserId().equals(userId)) {
                SelfIntroGetRes selfIntroGetRes = new SelfIntroGetRes();
                selfIntroGetRes.setQuestion(selfIntro.getQuestion());
                selfIntroGetRes.setContents(selfIntro.getContents());
                selfIntroGetRes.setIntroSeq(selfIntro.getIntroSeq());
                List<IntroTag> introTagList = this.getIntroTagsByIntroSeq(selfIntro.getIntroSeq());
                if (introTagList != null) {
                    StringBuilder sb = new StringBuilder();
                    for (IntroTag tag : introTagList) {
                        sb.append(tag.getIntroTagName());
                        sb.append(", ");
                    }
                    if (sb.length() > 1)
                        sb.delete(sb.length() - 2, sb.length());
                    selfIntroGetRes.setIntroTag(sb.toString());
                }
                selfIntroList.add(selfIntroGetRes);
            }
        }
        return selfIntroList;
    }

    public SelfIntroGetRes getSelfIntro(String userId, Integer introSeq) {
        Optional<SelfIntro> oSelfIntro = selfIntroRepository.findByIntroSeq(introSeq);
        if (oSelfIntro.isPresent()) {
            SelfIntro selfIntro = oSelfIntro.get();
            if (selfIntro.getUser().getUserId().equals(userId)) {
                SelfIntroGetRes selfIntroGetRes = new SelfIntroGetRes();
                selfIntroGetRes.setQuestion(selfIntro.getQuestion());
                selfIntroGetRes.setContents(selfIntro.getContents());
                selfIntroGetRes.setIntroSeq(selfIntro.getIntroSeq());
                List<IntroTag> introTagList = this.getIntroTagsByIntroSeq(introSeq);
                if (introTagList != null) {
                    StringBuilder sb = new StringBuilder();
                    for (IntroTag tag : introTagList) {
                        sb.append(tag.getIntroTagName());
                        sb.append(", ");
                    }
                    if (sb.length() > 1)
                        sb.delete(sb.length() - 2, sb.length());
                    selfIntroGetRes.setIntroTag(sb.toString());
                }
                return selfIntroGetRes;
            }
        }
        return null;
    }

    public List<SelfIntroGetRes> getSelfIntroByNoticeSeq(Integer noticeSeq) {
        Optional<Notice> oNotice = noticeRepository.findByNoticeSeq(noticeSeq);
        if (oNotice.isPresent()) {
            Notice notice = oNotice.get();
            Optional<List<SelfIntro>> oIntros = selfIntroRepository.findAllByNoticeSeq(noticeSeq);
        
        if (oIntros.isPresent()) {
            List<SelfIntro> intros = oIntros.get();
            List<SelfIntroGetRes> introGetResList = new ArrayList<>();
            for (SelfIntro intro : intros) {
                SelfIntroGetRes selfIntroGetRes = new SelfIntroGetRes();
                selfIntroGetRes.setIntroSeq(intro.getIntroSeq());
                selfIntroGetRes.setQuestion(intro.getQuestion());
                selfIntroGetRes.setContents(intro.getContents());
                List<IntroTag> introTagList = this.getIntroTagsByIntroSeq(intro.getIntroSeq());
                StringBuilder sb = new StringBuilder();
                for (IntroTag tag : introTagList) {
                    sb.append(tag.getIntroTagName());
                    sb.append(", ");
                }
                if (sb.length() > 1)
                    sb.delete(sb.length() - 2, sb.length());
                selfIntroGetRes.setIntroTag(sb.toString());
                introGetResList.add(selfIntroGetRes);
            }
            return introGetResList;
        }
    }
        return null;
    }

    public List<IntroTag> getIntroTagsByIntroSeq(Integer introSeq) {
        Optional<List<IntroTag>> oIntroTags = selfIntroTagRepository.findAllByIntroSeq(introSeq);
        if (oIntroTags.isPresent()) {
            return oIntroTags.get();
        }
        return null;
    }

    @Transactional
    public SelfIntroPostRes createSelfIntroNoNotice(String userId, SelfIntroPostReq selfIntroPostReq) {
        SelfIntroPostRes selfIntroPostRes = new SelfIntroPostRes();
        selfIntroPostRes.setResult("fail");
        SelfIntro selfIntro = new SelfIntro();
        Optional<User> oUser = userRepository.findByUserId(userId);
        if (oUser.isPresent()) {
            User user = oUser.get();
            selfIntro.setUser(user);
            selfIntro.setContents(selfIntroPostReq.getContents());
            selfIntro.setModDtm(LocalDateTime.now());
            selfIntro.setQuestion(selfIntroPostReq.getQuestion());
            selfIntro.setRegDtm(LocalDateTime.now());
            selfIntro.setNoticeSeq(null);
            selfIntro = selfIntroRepository.save(selfIntro);
            String introTagList = selfIntroPostReq.getIntroTag();
            if (introTagList != null) {
                String[] tagList = introTagList.split(", ");
                for (String tag : tagList) {
                    IntroTag introTag = new IntroTag();
                    introTag.setIntroSeq(selfIntro.getIntroSeq());
                    introTag.setIntroTagName(tag);
                    selfIntroTagRepository.save(introTag);
                }
            }
            if (selfIntro != null) {
                selfIntroPostRes.setResult("success");
            }
        }
        return selfIntroPostRes;
    }

    @Transactional
    public SelfIntroPostRes createSelfIntro(String userId, SelfIntroPostReq selfIntroPostReq) {
        SelfIntroPostRes selfIntroPostRes = new SelfIntroPostRes();
        selfIntroPostRes.setResult("fail");
        SelfIntro selfIntro = new SelfIntro();
        Optional<User> oUser = userRepository.findByUserId(userId);
        if (oUser.isPresent()) {
            Optional<Notice> oNotice = noticeRepository.findById(selfIntroPostReq.getNoticeSeq());
            if (oNotice.isPresent()) {
                User user = oUser.get();
                Notice notice = oNotice.get();
                selfIntro.setUser(user);
                selfIntro.setContents(selfIntroPostReq.getContents());
                selfIntro.setModDtm(LocalDateTime.now());
                selfIntro.setQuestion(selfIntroPostReq.getQuestion());
                selfIntro.setRegDtm(LocalDateTime.now());
                selfIntro.setNoticeSeq(notice.getNoticeSeq());
                selfIntro = selfIntroRepository.save(selfIntro);
                String introTagList = selfIntroPostReq.getIntroTag();
                if (introTagList != null) {
                    String[] tagList = introTagList.split(", ");
                    for (String tag : tagList) {
                        IntroTag introTag = new IntroTag();
                        introTag.setIntroSeq(selfIntro.getIntroSeq());
                        introTag.setIntroTagName(tag);
                        selfIntroTagRepository.save(introTag);
                    }
                }
                if (selfIntro != null) {
                    selfIntroPostRes.setResult("success");
                }
            }
        }
        return selfIntroPostRes;
    }

    @Transactional
    public SelfIntroPatchRes updateSelfIntro(String userId, SelfIntroPatchReq selfIntroPatchReq) {
        SelfIntroPatchRes selfIntroPatchRes = new SelfIntroPatchRes();
        selfIntroPatchRes.setResult("fail");
        Optional<User> oUser = userRepository.findByUserId(userId);
        if (oUser.isPresent()) {
            User user = oUser.get();
            Optional<SelfIntro> oSelfIntro = selfIntroRepository.findById(selfIntroPatchReq.getSelfIntroSeq());
            if (oSelfIntro.isPresent()) {
                SelfIntro selfIntro = oSelfIntro.get();
                if (selfIntro.getUser().getUserSeq() != user.getUserSeq())
                    return selfIntroPatchRes;
                if (StringUtils.isNotBlank(selfIntroPatchReq.getContents()))
                    selfIntro.setContents(selfIntroPatchReq.getContents());
                selfIntro.setModDtm(LocalDateTime.now());
                if (StringUtils.isNotBlank(selfIntroPatchReq.getQuestion()))
                    selfIntro.setQuestion(selfIntroPatchReq.getQuestion());
                selfIntro = selfIntroRepository.save(selfIntro);
                selfIntroTagRepository.deleteAllByIntroSeq(selfIntro.getIntroSeq());
                String introTagList = selfIntroPatchReq.getIntroTag();
                if (introTagList != null) {
                    String[] tagList = introTagList.split(", ");
                    for (String tag : tagList) {
                        IntroTag introTag = new IntroTag();
                        introTag.setIntroSeq(selfIntro.getIntroSeq());
                        introTag.setIntroTagName(tag);
                        selfIntroTagRepository.save(introTag);
                    }
                }
                if (selfIntro != null) {
                    selfIntroPatchRes.setResult("success");
                }
            }
        }
        return selfIntroPatchRes;
    }

    @Transactional
    public SelfIntroDeleteRes deleteSelfIntro(String userId, SelfIntroDeleteReq selfIntroDeleteReq) {
        SelfIntroDeleteRes selfIntroDeleteRes = new SelfIntroDeleteRes();
        selfIntroDeleteRes.setResult("fail");
        Optional<User> oUser = userRepository.findByUserId(userId);
        if (oUser.isPresent()) {
            User user = oUser.get();
            Optional<SelfIntro> oSelfIntro = selfIntroRepository.findById(selfIntroDeleteReq.getSelfIntroSeq());
            if (oSelfIntro.isPresent()) {
                SelfIntro selfIntro = oSelfIntro.get();
                if (selfIntro.getUser().getUserSeq() == user.getUserSeq()) {
                    selfIntroRepository.deleteById(selfIntroDeleteReq.getSelfIntroSeq());
                    selfIntroTagRepository.deleteAllByIntroSeq(selfIntro.getIntroSeq());
                    selfIntroDeleteRes.setResult("success");
                }
            }
        }
        return selfIntroDeleteRes;
    }
}

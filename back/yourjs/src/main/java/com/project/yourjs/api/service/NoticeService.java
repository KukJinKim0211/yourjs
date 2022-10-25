package com.project.yourjs.api.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.yourjs.api.req.NoticeReq;
import com.project.yourjs.api.res.NoticeDeleteRes;
import com.project.yourjs.api.res.NoticePatchRes;
import com.project.yourjs.api.res.NoticePostRes;
import com.project.yourjs.db.entity.Notice;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.repository.NoticeRepository;
import com.project.yourjs.db.repository.UserRepository;

@Service
public class NoticeService {
    private final NoticeRepository noticeRepository;
    private final UserRepository userRepository;

    public NoticeService(NoticeRepository noticeRepository, UserRepository userRepository) {
        this.noticeRepository = noticeRepository;
        this.userRepository = userRepository;
    }

    public List<Notice> getAllNotice(String userId) {
        List<Notice> noticeList = new ArrayList<Notice>();
        List<Notice> allNoticeList = noticeRepository.findAll();
        for (Notice notice : allNoticeList){
            if(notice.getUser().getUserId().equals(userId)){
                noticeList.add(notice);
            }
        }
        return noticeList;
    }

    @Transactional
    public NoticePostRes createNotice(String userId, NoticeReq noticeReq) {
        NoticePostRes noticePostRes = new NoticePostRes();
        noticePostRes.setResult("fail");
        Notice notice = new Notice();
        Optional<User> oUser = userRepository.findByUserId(userId);
        if (oUser.isPresent()) {
            User user = oUser.get();
            notice.setUser(user);
            notice.setNoticeName(noticeReq.getNoticeName());
            notice.setLink(noticeReq.getLink());
            notice.setProgress(noticeReq.getProgress());
            notice.setModDtm(LocalDateTime.now());
            notice.setRegDtm(LocalDateTime.now());
            notice = noticeRepository.save(notice);
            if (notice != null) {
                noticePostRes.setResult("success");
            }
        }
        return noticePostRes;
    }

    @Transactional
    public NoticePatchRes updateNotice(String userId, Integer noticeSeq, NoticeReq noticeReq) {
        NoticePatchRes noticePatchRes = new NoticePatchRes();
        noticePatchRes.setResult("fail");
        Optional<User> oUser = userRepository.findByUserId(userId);
        if (oUser.isPresent()) {
            User user = oUser.get();
            Optional<Notice> oNotice = noticeRepository.findById(noticeSeq);
            if (oNotice.isPresent()) {
                Notice notice = oNotice.get();
                if (notice.getUser().getUserSeq() != user.getUserSeq())
                    return noticePatchRes;
                if (StringUtils.isNotBlank(noticeReq.getNoticeName()))
                    notice.setNoticeName(noticeReq.getNoticeName());
                if (StringUtils.isNotBlank(noticeReq.getLink()))
                    notice.setLink(noticeReq.getLink());
                if (StringUtils.isNotBlank(noticeReq.getProgress()))
                    notice.setProgress(noticeReq.getProgress());
                notice.setModDtm(LocalDateTime.now());
                notice = noticeRepository.save(notice);
                if (notice != null) {
                    noticePatchRes.setResult("success");
                }
            }
        }
        return noticePatchRes;
    }

    @Transactional
    public NoticeDeleteRes deleteNotice(String userId, Integer noticeSeq) {
        NoticeDeleteRes noticeDeleteRes = new NoticeDeleteRes();
        noticeDeleteRes.setResult("fail");
        Optional<User> oUser = userRepository.findByUserId(userId);
        if (oUser.isPresent()) {
            User user = oUser.get();
            Optional<Notice> oNotice = noticeRepository.findById(noticeSeq);
            if (oNotice.isPresent()) {
                Notice notice = oNotice.get();
                if (notice.getUser().getUserSeq()==user.getUserSeq()) {
                    noticeRepository.deleteById(noticeSeq);
                    noticeDeleteRes.setResult("success");
                }
            }
        }
        return noticeDeleteRes;
    }
}

package com.project.yourjs.api.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.yourjs.api.req.NoticePostReq;
import com.project.yourjs.api.req.NoticeUpdateReq;
import com.project.yourjs.api.res.NoticeDeleteRes;
import com.project.yourjs.api.res.NoticePatchRes;
import com.project.yourjs.api.res.NoticePostRes;
import com.project.yourjs.db.entity.Notice;
import com.project.yourjs.db.entity.NoticeTag;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.repository.NoticeRepository;
import com.project.yourjs.db.repository.NoticeTagRepository;
import com.project.yourjs.db.repository.UserRepository;

@Service
public class NoticeService {
    private final NoticeRepository noticeRepository;
    private final UserRepository userRepository;
    private final NoticeTagRepository noticeTagRepository;

    public NoticeService(NoticeRepository noticeRepository, UserRepository userRepository,
            NoticeTagRepository noticeTagRepository) {
        this.noticeRepository = noticeRepository;
        this.userRepository = userRepository;
        this.noticeTagRepository = noticeTagRepository;
    }

    public List<Notice> getAllNotice(String userId) {
        List<Notice> noticeList = new ArrayList<Notice>();
        List<Notice> allNoticeList = noticeRepository.findAll();
        for (Notice notice : allNoticeList) {
            if (notice.getUser().getUserId().equals(userId)) {
                List<NoticeTag> noticeTagList = noticeTagRepository.findAllByNoticeSeq(notice.getNoticeSeq());
                StringBuilder sb = new StringBuilder();
                for(NoticeTag tag : noticeTagList) {
                    sb.append(tag.getNoticeTagName());
                    sb.append(", ");
                }
                sb.delete(sb.length()-2, sb.length());
                notice.setNoticeTag(sb.toString());
                noticeList.add(notice);
            }
        }
        return noticeList;
    }

    public List<NoticeTag> getAllNoticeTag(Integer noticeSeq){
        return noticeTagRepository.findAllByNoticeSeq(noticeSeq);
    }

    @Transactional
    public NoticePostRes createNotice(String userId, NoticePostReq noticePostReq) {
        NoticePostRes noticePostRes = new NoticePostRes();
        noticePostRes.setResult("fail");
        Notice notice = new Notice();
        Optional<User> oUser = userRepository.findByUserId(userId);
        if (oUser.isPresent()) {
            User user = oUser.get();
            notice.setUser(user);
            notice.setNoticeName(noticePostReq.getNoticeName());
            notice.setLink(noticePostReq.getLink());
            notice.setProgress(noticePostReq.getProgress());
            notice.setModDtm(LocalDateTime.now());
            notice.setRegDtm(LocalDateTime.now());
            notice.setCoName(noticePostReq.getCoName());
            notice = noticeRepository.save(notice);
            String noticeTagList = noticePostReq.getNoticeTag();
            if (noticeTagList != null) {
                String[] tagList = noticeTagList.split(", ");
                for (String tag : tagList) {
                    NoticeTag noticeTag = new NoticeTag();
                    noticeTag.setNoticeSeq(notice.getNoticeSeq());
                    noticeTag.setNoticeTagName(tag);
                    noticeTagRepository.save(noticeTag);
                }
            }
            if (notice != null) {
                noticePostRes.setResult("success");
            }
        }
        return noticePostRes;
    }

    @Transactional
    public NoticePatchRes updateNotice(String userId, NoticeUpdateReq noticeUpdateReq) {
        NoticePatchRes noticePatchRes = new NoticePatchRes();
        noticePatchRes.setResult("fail");
        Optional<User> oUser = userRepository.findByUserId(userId);
        if (oUser.isPresent()) {
            User user = oUser.get();
            Optional<Notice> oNotice = noticeRepository.findById(noticeUpdateReq.getNoticeSeq());
            if (oNotice.isPresent()) {
                Notice notice = oNotice.get();
                if (notice.getUser().getUserSeq() != user.getUserSeq())
                    return noticePatchRes;
                if (StringUtils.isNotBlank(noticeUpdateReq.getNoticeName()))
                    notice.setNoticeName(noticeUpdateReq.getNoticeName());
                if (StringUtils.isNotBlank(noticeUpdateReq.getLink()))
                    notice.setLink(noticeUpdateReq.getLink());
                if (StringUtils.isNotBlank(noticeUpdateReq.getProgress()))
                    notice.setProgress(noticeUpdateReq.getProgress());
                notice.setModDtm(LocalDateTime.now());
                if (StringUtils.isNotBlank(noticeUpdateReq.getCoName()))
                    notice.setCoName(noticeUpdateReq.getCoName());
                notice = noticeRepository.save(notice);
                noticeTagRepository.deleteAllByNoticeSeq(notice.getNoticeSeq());
                String noticeTagList = noticeUpdateReq.getNoticeTag();
                if (noticeTagList != null) {
                    String[] tagList = noticeTagList.split(", ");
                    for (String tag : tagList) {
                        NoticeTag noticeTag = new NoticeTag();
                        noticeTag.setNoticeSeq(notice.getNoticeSeq());
                        noticeTag.setNoticeTagName(tag);
                        noticeTagRepository.save(noticeTag);
                    }
                }
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
                if (notice.getUser().getUserSeq() == user.getUserSeq()) {
                    noticeRepository.deleteById(noticeSeq);
                    noticeTagRepository.deleteAllByNoticeSeq(noticeSeq);
                    noticeDeleteRes.setResult("success");
                }
            }
        }
        return noticeDeleteRes;
    }
}

package com.project.yourjs.api.service;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.yourjs.api.req.NoticePostReq;
import com.project.yourjs.api.req.NoticeUpdateReq;
import com.project.yourjs.api.req.ScheduleReq;
import com.project.yourjs.api.res.NoticeDeleteRes;
import com.project.yourjs.api.res.NoticeGetRes;
import com.project.yourjs.api.res.NoticePatchRes;
import com.project.yourjs.api.res.NoticePostRes;
import com.project.yourjs.api.res.ScheduleRes;
import com.project.yourjs.db.entity.Notice;
import com.project.yourjs.db.entity.NoticeTag;
import com.project.yourjs.db.entity.Schedule;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.repository.NoticeRepository;
import com.project.yourjs.db.repository.NoticeTagRepository;
import com.project.yourjs.db.repository.ScheduleRepository;
import com.project.yourjs.db.repository.UserRepository;

@Service
public class NoticeService {
    private final NoticeRepository noticeRepository;
    private final UserRepository userRepository;
    private final NoticeTagRepository noticeTagRepository;
    private final ScheduleRepository scheduleRepository;

    public NoticeService(NoticeRepository noticeRepository, UserRepository userRepository,
            NoticeTagRepository noticeTagRepository, ScheduleRepository scheduleRepository) {
        this.noticeRepository = noticeRepository;
        this.userRepository = userRepository;
        this.noticeTagRepository = noticeTagRepository;
        this.scheduleRepository = scheduleRepository;
    }

    public List<NoticeGetRes> getAllNotice(String userId) {
        List<NoticeGetRes> noticeList = new ArrayList<>();
        List<Notice> allNoticeList = noticeRepository.findAll();
        for (Notice notice : allNoticeList) {
            if (notice.getUser().getUserId().equals(userId)) {
                NoticeGetRes noticeGetRes = new NoticeGetRes();
                List<NoticeTag> noticeTagList = noticeTagRepository.findAllByNoticeSeq(notice.getNoticeSeq());
                if (noticeTagList != null) {
                    StringBuilder sb = new StringBuilder();
                    for (NoticeTag tag : noticeTagList) {
                        sb.append(tag.getNoticeTagName());
                        sb.append(", ");
                    }
                    if (sb.length() > 1)
                        sb.delete(sb.length() - 2, sb.length());
                    noticeGetRes.setNoticeTag(sb.toString());
                }
                List<Schedule> schedules = scheduleRepository.findAllByNoticeSeq(notice.getNoticeSeq());
                List<ScheduleRes> schedulesRes = new ArrayList<>();
                if (schedules != null) {
                    for (Schedule schedule : schedules) {
                        ScheduleRes scheduleRes = new ScheduleRes();
                        scheduleRes.setScheduleName(schedule.getScheduleName());
                        String dateTime = schedule.getScheduleDate().toLocalDate() + " "
                                + schedule.getScheduleDate().toLocalTime();
                        scheduleRes.setScheduleDate(dateTime);
                        schedulesRes.add(scheduleRes);
                    }
                }
                noticeGetRes.setNoticeSeq(notice.getNoticeSeq());
                noticeGetRes.setSchedules(schedulesRes);
                noticeGetRes.setCoName(notice.getCoName());
                noticeGetRes.setLink(notice.getLink());
                noticeGetRes.setNoticeName(notice.getNoticeName());
                noticeGetRes.setProgress(notice.getProgress());
                noticeList.add(noticeGetRes);
            }
        }
        return noticeList;
    }

    public NoticeGetRes getNotice(String userId, Integer noticeSeq) {
        Optional<Notice> oNotice = noticeRepository.findByNoticeSeq(noticeSeq);
        if (oNotice.isPresent()) {
            Notice notice = oNotice.get();
            if (notice != null) {
                NoticeGetRes noticeGetRes = new NoticeGetRes();
                noticeGetRes.setNoticeSeq(notice.getNoticeSeq());
                noticeGetRes.setCoName(notice.getCoName());
                noticeGetRes.setLink(notice.getLink());
                noticeGetRes.setNoticeName(notice.getNoticeName());
                noticeGetRes.setProgress(notice.getProgress());
                List<Schedule> schedules = scheduleRepository.findAllByNoticeSeq(notice.getNoticeSeq());
                List<ScheduleRes> schedulesRes = new ArrayList<>();
                if (schedules != null) {
                    for (Schedule schedule : schedules) {
                        ScheduleRes scheduleRes = new ScheduleRes();
                        scheduleRes.setScheduleName(schedule.getScheduleName());
                        String dateTime = schedule.getScheduleDate().toLocalDate() + " "
                                + schedule.getScheduleDate().toLocalTime();
                        scheduleRes.setScheduleDate(dateTime);
                        schedulesRes.add(scheduleRes);
                    }
                }
                List<NoticeTag> noticeTagList = noticeTagRepository.findAllByNoticeSeq(notice.getNoticeSeq());
                if (noticeTagList != null) {
                    StringBuilder sb = new StringBuilder();
                    for (NoticeTag tag : noticeTagList) {
                        sb.append(tag.getNoticeTagName());
                        sb.append(", ");
                    }
                    if (sb.length() > 1)
                        sb.delete(sb.length() - 2, sb.length());
                    noticeGetRes.setNoticeTag(sb.toString());
                }
                return noticeGetRes;
            }
        }
        return null;
    }

    public List<NoticeTag> getAllNoticeTag(Integer noticeSeq) {
        return noticeTagRepository.findAllByNoticeSeq(noticeSeq);
    }

    @Transactional
    public NoticePostRes createNotice(String userId, NoticePostReq noticePostReq) {
        NoticePostRes noticePostRes = new NoticePostRes();
        noticePostRes.setNoticeSeq(-1);
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
            if (notice != null) {
                List<ScheduleReq> schedules = noticePostReq.getSchedules();
                if (schedules != null) {
                    for (ScheduleReq scheduleReq : schedules) {
                        Schedule schedule = new Schedule();
                        schedule.setNoticeSeq(notice.getNoticeSeq());
                        schedule.setScheduleName(scheduleReq.getScheduleName());
                        String[] dateTime = scheduleReq.getScheduleDate().split(" ");
                        String[] date = dateTime[0].split("-");
                        String[] time = dateTime[1].split(":");
                        LocalDateTime schedulDateTime = LocalDateTime.of(Integer.parseInt(date[0]),
                                Month.of(Integer.parseInt(date[1])), Integer.parseInt(date[2]),
                                Integer.parseInt(time[0]),
                                Integer.parseInt(time[1]), Integer.parseInt(time[2]));
                        schedule.setScheduleDate(schedulDateTime);
                        scheduleRepository.save(schedule);
                    }
                }
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
                noticePostRes.setNoticeSeq(notice.getNoticeSeq());
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
                if (StringUtils.isNotBlank(noticeUpdateReq.getNoticeTag())) {
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
                }
                if (noticeUpdateReq.getSchedules() != null) {
                    scheduleRepository.deleteAllByNoticeSeq(noticeUpdateReq.getNoticeSeq());
                    List<ScheduleReq> schedules = noticeUpdateReq.getSchedules();
                    if (schedules != null) {
                        for (ScheduleReq scheduleReq : schedules) {
                            Schedule schedule = new Schedule();
                            schedule.setNoticeSeq(noticeUpdateReq.getNoticeSeq());
                            schedule.setScheduleName(scheduleReq.getScheduleName());
                            String[] dateTime = scheduleReq.getScheduleDate().split(" ");
                            String[] date = dateTime[0].split("-");
                            String[] time = dateTime[1].split(":");
                            LocalDateTime schedulDateTime = LocalDateTime.of(Integer.parseInt(date[0]),
                                    Month.of(Integer.parseInt(date[1])), Integer.parseInt(date[2]),
                                    Integer.parseInt(time[0]),
                                    Integer.parseInt(time[1]), Integer.parseInt(time[2]));
                            schedule.setScheduleDate(schedulDateTime);
                            scheduleRepository.save(schedule);
                        }
                    }
                }
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
                if (notice.getUser().getUserSeq() == user.getUserSeq()) {
                    noticeRepository.deleteById(noticeSeq);
                    scheduleRepository.deleteAllByNoticeSeq(noticeSeq);
                    noticeTagRepository.deleteAllByNoticeSeq(noticeSeq);
                    noticeDeleteRes.setResult("success");
                }
            }
        }
        return noticeDeleteRes;
    }
}

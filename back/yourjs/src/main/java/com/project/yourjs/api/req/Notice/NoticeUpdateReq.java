package com.project.yourjs.api.req.Notice;

import java.util.List;

import lombok.Getter;

@Getter
public class NoticeUpdateReq {
    private Integer noticeSeq;
    private String noticeName;
    private String link;
    private String progress;
    private String coName;
    private String noticeTag;
    private List<ScheduleReq> schedules;
}

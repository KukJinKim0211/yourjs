package com.project.yourjs.api.req;

import java.util.List;

import lombok.Getter;

@Getter
public class NoticePostReq {
    private String noticeName;
    private String link;
    private String progress;
    private String coName;
    private String noticeTag;
    private List<ScheduleReq> schedules;
}

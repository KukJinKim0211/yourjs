package com.project.yourjs.api.res;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NoticeGetRes {
    private Integer noticeSeq;
    private String coName;
    private String noticeName;
    private String link;
    private String progress;
    private String noticeTag;
    private List<ScheduleRes> schedules;
}

package com.project.yourjs.api.res.Notice;

import java.util.List;

import com.project.yourjs.api.res.SelfIntro.SelfIntroGetRes;

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
    private List<SelfIntroGetRes> intros;
}

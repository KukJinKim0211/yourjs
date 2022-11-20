package com.project.yourjs.api.req.Notice;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleUpdateReq {
    private Integer scheduleSeq;
    private Integer noticeSeq;
    private String scheduleName;
    private String scheduleDate;
}

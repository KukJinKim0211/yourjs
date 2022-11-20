package com.project.yourjs.api.res.Notice;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleRes {
    private Integer scheduleSeq;
    private String scheduleName;
    private String scheduleDate;
}

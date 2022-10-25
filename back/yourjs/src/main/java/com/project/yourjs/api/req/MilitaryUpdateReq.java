package com.project.yourjs.api.req;

import lombok.Getter;

import java.sql.Date;
@Getter
public class MilitaryUpdateReq {

    private Long militarySeq;
    private String militaryType;
    private String specialityType;
    private Date startDate;
    private Date endDate;
    private String fileSrc;
}

package com.project.yourjs.api.res;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class MilitaryRes {

    private Long militarySeq;
    private String militaryType;
    private String specialityType;
    private Date startDate;
    private Date endDate;
    private String discharge;

    public MilitaryRes(Long militarySeq, String militaryType, String specialityType, Date startDate, Date endDate, String discharge) {
        this.militarySeq = militarySeq;
        this.militaryType = militaryType;
        this.specialityType = specialityType;
        this.startDate = startDate;
        this.endDate = endDate;
        this.discharge = discharge;
    }
}

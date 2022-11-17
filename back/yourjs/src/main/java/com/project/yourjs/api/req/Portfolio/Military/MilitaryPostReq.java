package com.project.yourjs.api.req.Portfolio.Military;

import lombok.Getter;

import javax.persistence.Column;
import java.sql.Date;

@Getter
public class MilitaryPostReq {

    private String militaryType;
    private String specialityType;
    private Date startDate;
    private Date endDate;
    private String discharge;
}

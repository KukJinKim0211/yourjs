package com.project.yourjs.api.req.Portfolio.Award;

import com.project.yourjs.db.entity.Award;
import lombok.Builder;
import lombok.Getter;

import java.sql.Date;

@Getter
@Builder
public class AwardPostReq {
    private String awardName;
    private String awardContents;
    private String awardInstitution;
    private Date winDate;

    public Award toEntity(){
        return Award.builder()
                .awardName(this.awardName)
                .awardContents(this.awardContents)
                .awardInstitution(this.awardInstitution)
                .winDate(this.winDate)
                .build();
    }
}

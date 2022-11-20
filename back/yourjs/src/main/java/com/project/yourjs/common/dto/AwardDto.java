package com.project.yourjs.common.dto;

import com.project.yourjs.db.entity.Award;
import lombok.*;

import java.sql.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AwardDto {
    private Long awardSeq;
    private String awardName;
    private String awardContents;
    private String awardInstitution;
    private Date winDate;

    public Award toEntity(){
        return Award.builder()
                .awardSeq(this.awardSeq)
                .awardName(this.awardName)
                .awardContents(this.awardContents)
                .awardInstitution(this.awardInstitution)
                .winDate(this.winDate)
                .build();
    }

}

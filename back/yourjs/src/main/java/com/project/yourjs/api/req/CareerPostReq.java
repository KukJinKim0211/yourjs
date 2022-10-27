package com.project.yourjs.api.req;

import com.project.yourjs.db.entity.Career;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.sql.Date;

@Getter
@Builder
public class CareerPostReq {
    private String company;
    private String department;
    private String position;
    @Schema(description = "0000-00-00")
    private Date startDate;
    @Schema(description = "0000-00-00")
    private Date endDate;
    @Schema(description = "만원 단위")
    private Integer salary;
    private Boolean careerState;

    public Career toEntity(){
        return Career.builder()
                .company(this.company)
                .department(this.department)
                .position(this.position)
                .startDate(this.startDate)
                .endDate(this.endDate)
                .salary(this.salary)
                .careerState(this.careerState)
                .build();

    }
}

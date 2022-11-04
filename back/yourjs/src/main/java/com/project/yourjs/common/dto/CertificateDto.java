package com.project.yourjs.common.dto;

import com.project.yourjs.db.entity.Certificate;
import lombok.*;

import java.sql.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CertificateDto {
    private Long certSeq;
    private String certName;
    private String certNum;
    private String certInstitution;
    private Date acquisitionDate;

    public Certificate toEntity(){
        return Certificate.builder()
                .certSeq(this.certSeq)
                .certName(this.certName)
                .certNum(this.certNum)
                .certInstitution(this.certInstitution)
                .acquisitionDate(this.acquisitionDate)
                .build();
    }
}

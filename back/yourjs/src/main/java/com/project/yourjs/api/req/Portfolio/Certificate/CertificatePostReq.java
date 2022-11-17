package com.project.yourjs.api.req.Portfolio.Certificate;

import com.project.yourjs.db.entity.Certificate;
import lombok.Builder;
import lombok.Getter;

import java.sql.Date;

@Getter
@Builder
public class CertificatePostReq {
    private String certName;
    private String certNum;
    private String certInstitution;
    private Date acquisitionDate;

    public Certificate toEntity(){
        return Certificate.builder()
                .certName(this.certName)
                .certNum(this.certNum)
                .certInstitution(this.certInstitution)
                .acquisitionDate(this.acquisitionDate)
                .build();
    }
}

package com.project.yourjs.api.req;

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
    private Date acquisionDate;

    public Certificate toEntity(){
        return Certificate.builder()
                .certName(this.certName)
                .certNum(this.certNum)
                .certInstitution(this.certInstitution)
                .acquisionDate(this.acquisionDate)
                .build();
    }

}

package com.project.yourjs.db.entity;

import com.project.yourjs.common.dto.CareerDto;
import com.project.yourjs.common.dto.CertificateDto;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "certification")
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cert_seq")
    private Long certSeq;

    @ManyToOne(fetch = LAZY, targetEntity = User.class)
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(name = "cert_name", nullable = false)
    private String certName;

    @Column(name = "cert_num", nullable = false)
    private String certNum;

    @Column(name = "cert_institution", nullable = false)
    private String certInstitution;

    @Column(name = "acquision_date", nullable = false)
    private Date acquisionDate;

    @Column(name = "file_src")
    private String fileSrc;

    @CreationTimestamp
    @CreatedDate
    @Column(updatable = false, nullable = false)
    private LocalDateTime regDtm;

    @UpdateTimestamp
    @LastModifiedDate
    @Column
    private LocalDateTime modDtm;

    public CertificateDto toDto(){
        return CertificateDto.builder()
                .certSeq(this.certSeq)
                .certName(this.certName)
                .certNum(this.certNum)
                .certInstitution(this.certInstitution)
                .acquisionDate(this.acquisionDate)
                .build();
    }
}

package com.project.yourjs.db.entity;

import static javax.persistence.FetchType.LAZY;

import java.sql.Date;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import com.project.yourjs.common.dto.CertificateDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private Date acquisitionDate;

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
                .acquisitionDate(this.acquisitionDate)
                .build();
    }
}

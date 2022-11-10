package com.project.yourjs.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import com.project.yourjs.api.res.Portfolio.Military.MilitaryRes;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "military")
@NoArgsConstructor
public class Military {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "military_seq")
    private Long militarySeq;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(name = "military_type", nullable = false)
    private String militaryType;

    @Column(name = "speciality_type", nullable = false)
    private String specialityType;

    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "discharge", nullable = false)
    private String discharge;

    @CreationTimestamp
    @CreatedDate
    @Column(updatable = false, nullable = false)
    private LocalDateTime regDtm;

    @UpdateTimestamp
    @LastModifiedDate
    @Column
    private LocalDateTime modDtm;

    public MilitaryRes toDto() {
        return new MilitaryRes(
                this.militarySeq,
                this.militaryType,
                this.specialityType,
                this.startDate,
                this.endDate,
                this.discharge
        );
    }
}

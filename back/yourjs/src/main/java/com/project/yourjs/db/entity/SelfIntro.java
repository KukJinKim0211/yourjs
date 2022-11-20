package com.project.yourjs.db.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "self_introduce")
public class SelfIntro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "intro_seq")
    private Integer introSeq;

    @JsonBackReference
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_seq")
    private User user;

    // @JsonBackReference
    // @ManyToOne(targetEntity = Notice.class)
    // @JoinColumn(name = "notice_seq")
    // private Notice notice;
    @Column(name = "notice_seq")
    private Integer noticeSeq;

    @Column(name = "question")
    private String question;

    @Column(name = "contents", length = 1000)
    private String contents;

    @CreatedDate
    @Column(name = "reg_dtm")
    private LocalDateTime regDtm;

    @LastModifiedDate
    @Column(name = "mod_dtm")
    private LocalDateTime modDtm;
}

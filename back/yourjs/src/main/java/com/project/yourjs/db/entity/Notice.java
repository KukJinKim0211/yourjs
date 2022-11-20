package com.project.yourjs.db.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
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
@Table(name = "notice")
public class Notice {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "notice_seq", nullable = false, columnDefinition = "INT UNSIGNED UNIQUE")
  private Integer noticeSeq;

  @JsonBackReference
  @ManyToOne(targetEntity = User.class)
  @JoinColumn(name = "userSeq")
  private User user;

  @Column(name = "notice_name", length = 45)
  private String noticeName;

  @CreatedDate
  @Column(name = "reg_dtm")
  private LocalDateTime regDtm;

  @LastModifiedDate
  @Column(name = "mod_dtm")
  private LocalDateTime modDtm;

  @Column(name = "link", length = 300)
  private String link;

  @Column(name = "notice_tag")
  private String noticeTag;

  @Column(name = "file_src")
  private String fileSrc;

  @Column(name = "progress")
  private String progress;

  @Column(name = "co_name")
  private String coName;
}

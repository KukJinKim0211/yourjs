package com.project.yourjs.db.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

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

  private Integer userSeq;

  @Column(name = "notice_name", length = 45)
  private String noticeName;

  @Column(name = "reg_dtm")
  private LocalDateTime regDtm;

  @Column(name = "mod_dtm")
  private LocalDateTime modDtm;

  @Column(name = "link", length = 45)
  private String link;

  @Column(name = "notice_tag")
  private String noticeTag;

  @Column(name = "file_src")
  private String fileSrc;

  @Column(name = "progress")
  private String progress;
}

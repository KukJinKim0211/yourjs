package com.project.yourjs.common.dto;

import java.time.LocalDateTime;

import com.project.yourjs.db.entity.Notice;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoticeDto {
  private String userName;
  private String noticeName;
  private LocalDateTime regDtm;
  private LocalDateTime modDtm;
  private String link;
  private String progress;

  public static NoticeDto from(Notice notice) {
    System.out.println("Dto call");
    if(notice == null) return null;
    return null;
  }
}

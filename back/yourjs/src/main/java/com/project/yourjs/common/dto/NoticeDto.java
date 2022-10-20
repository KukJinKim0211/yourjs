package com.project.yourjs.common.dto;

import com.project.yourjs.db.entity.Notice;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoticeDto {
  private String notice;

  public static NoticeDto from(Notice notice) {
    System.out.println("Dto call");
    if(notice == null) return null;
    return null;
  }
}

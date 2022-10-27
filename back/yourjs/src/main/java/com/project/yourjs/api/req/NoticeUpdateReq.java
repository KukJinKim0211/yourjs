package com.project.yourjs.api.req;

import lombok.Getter;

@Getter
public class NoticeUpdateReq {
    private Integer noticeSeq;
    private String noticeName;
    private String link;
    private String progress;
}

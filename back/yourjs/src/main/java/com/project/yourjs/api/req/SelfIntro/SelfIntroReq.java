package com.project.yourjs.api.req.SelfIntro;

import lombok.Getter;

@Getter
public class SelfIntroReq {
    private String question;
    private String contents;
    private Integer maxLength;
    private Integer maxBytes;
    private Integer noticeSeq;
}

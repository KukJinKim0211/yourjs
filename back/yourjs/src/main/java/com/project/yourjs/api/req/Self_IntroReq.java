package com.project.yourjs.api.req;

import lombok.Getter;

@Getter
public class Self_IntroReq {
    private String question;
    private String contents;
    private Integer maxLength;
    private Integer maxBytes;
    private Integer noticeSeq;
}

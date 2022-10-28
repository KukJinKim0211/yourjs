package com.project.yourjs.api.req;

import lombok.Getter;

@Getter
public class Self_IntroPostReq {
    private String coName;
    private String question;
    private String contents;
    private Integer maxLength;
    private Integer maxBytes;
    private Integer noticeSeq;
}

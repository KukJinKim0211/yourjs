package com.project.yourjs.api.req;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Self_IntroReq {
    private String coName;
    private String question;
    private String contents;
    private Integer maxLength;
    private Integer maxBytes;
    private Integer noticeSeq;
}

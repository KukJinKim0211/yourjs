package com.project.yourjs.api.req;

import lombok.Getter;

@Getter
public class SelfIntroPostReq {
    private String question;
    private String contents;
    private Integer noticeSeq;
    private String introTag;
}

package com.project.yourjs.api.req.SelfIntro;

import lombok.Getter;

@Getter
public class SelfIntroPatchReq {
    private Integer introSeq;
    private String question;
    private String contents;
    private Integer noticeSeq;
    private String introTag;
}

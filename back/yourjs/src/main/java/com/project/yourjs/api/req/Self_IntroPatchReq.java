package com.project.yourjs.api.req;

import lombok.Getter;

@Getter
public class Self_IntroPatchReq {
    private Integer selfIntroSeq;
    private String question;
    private String contents;
    private Integer noticeSeq;
    private String introTag;
}

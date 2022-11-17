package com.project.yourjs.api.res.SelfIntro;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SelfIntroGetRes {
    private Integer introSeq;
    private String question;
    private String contents;
    private String introTag;
}

package com.project.yourjs.api.res.Portfolio.Subject;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubjectUserRes {
    private long userSeq;
    private String userId;
    private String userName;
    private String nickname;
    private Integer infoLevel;
    private String userImg;
    private int totCnt;

    public SubjectUserRes(long userSeq, String userId, String userName, String nickname, Integer infoLevel, String userImg, int totCnt) {
        this.userSeq = userSeq;
        this.userId = userId;
        this.userName = userName;
        this.nickname = nickname;
        this.infoLevel = infoLevel;
        this.userImg = userImg;
        this.totCnt = totCnt;

    }
}

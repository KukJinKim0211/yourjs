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

    public SubjectUserRes(long userSeq, String userId, String userName, String nickname, Integer infoLevel, String userImg) {
        this.userSeq = userSeq;
        this.userId = userId;
        this.userName = userName;
        this.nickname = nickname;
        this.infoLevel = infoLevel;
        this.userImg = userImg;
    }
}

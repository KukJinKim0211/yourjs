package com.project.yourjs.api.res.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailInfoRes {
    String userName;
    String email;
    String nickname;
    Integer infoLevel;
    String userImg;
}

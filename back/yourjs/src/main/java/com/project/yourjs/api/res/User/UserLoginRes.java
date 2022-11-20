package com.project.yourjs.api.res.User;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserLoginRes{
	String accessToken;
	String refreshToken;
	String nickname;
	Integer infoLevel;
}

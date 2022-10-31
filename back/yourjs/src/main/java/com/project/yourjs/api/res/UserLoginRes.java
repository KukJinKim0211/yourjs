package com.project.yourjs.api.res;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserLoginRes{
	String accessToken;
	String refreshToken;
}

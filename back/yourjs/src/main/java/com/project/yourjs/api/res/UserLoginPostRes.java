package com.project.yourjs.api.res;

import com.project.yourjs.common.model.BaseResponseBody;
import com.project.yourjs.db.entity.User;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 로그인 API ([POST] /api/auth) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
public class UserLoginPostRes extends BaseResponseBody {

	String accessToken;

	User user;

	public static UserLoginPostRes of(Integer statusCode, String message, String accessToken, User user) {
		UserLoginPostRes res = new UserLoginPostRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setAccessToken(accessToken);
		res.setUser(user);
		return res;
	}
}

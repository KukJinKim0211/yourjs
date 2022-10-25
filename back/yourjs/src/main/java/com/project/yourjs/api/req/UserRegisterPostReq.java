package com.project.yourjs.api.req;

//import io.swagger.annotations.ApiModel;
//import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 회원가입 API ([POST] /user) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
public class UserRegisterPostReq {

	String userId;
	String password;
	String userName;
	String nickname;

}

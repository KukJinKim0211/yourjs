package com.project.yourjs.api.service;

import com.project.yourjs.api.req.UserRegisterPostReq;
import com.project.yourjs.db.entity.User;

public interface UserService {
    User getUserByUserId(String userId);
//    User getUserByNickname(String nickname);
    User createUser(UserRegisterPostReq userRegisterInfo);
    Boolean checkIdDuplicated(String userId);
    Boolean checkNicknameDuplicated(String nickname);
}

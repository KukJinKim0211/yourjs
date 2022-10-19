package com.project.yourjs.api.service;

import com.project.yourjs.api.req.UserRegisterPostReq;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.repository.UserRepository;
import com.project.yourjs.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    UserRepositorySupport userRepositorySupport;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public User getUserByUserId(String userId) {
        User user = userRepositorySupport.findUserByUserId(userId).get();

        return user;
    }

//    @Override
//    public User getUserByNickname(String nickname) {
//        return userRepository.findUserByNickname(nickname);
//    }

    @Override
    public User createUser(UserRegisterPostReq userRegisterInfo) {
        User user = new User();
        user.setUserId(userRegisterInfo.getUserId());
        // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
        user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
        user.setNickname(userRegisterInfo.getNickname());
        user.setUserName(userRegisterInfo.getUserName());
        user.setEmail(userRegisterInfo.getEmail());
        user.setInfoLevel(0);
        return userRepository.save(user);
    }

    @Override
    public Boolean checkIdDuplicated(String userId) {
        if (userRepository.countByUserId(userId) == 0) {
            return true;
        }
        return false;
    }

    @Override
    public Boolean checkNicknameDuplicated(String nickname) {
        if (userRepository.countByNickname(nickname) == 0) {
            return true;
        }
        return false;
    }
}

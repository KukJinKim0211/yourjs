package com.project.yourjs.common.auth;

import com.project.yourjs.api.service.UserService;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class PUserDetailService implements UserDetailsService {

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        User user = userRepositorySupport.findUserByUserId(userId).get();
        if(user != null) {
            PUserDetails userDetails = new PUserDetails(user);
            return userDetails;
        }
        return null;
    }
}

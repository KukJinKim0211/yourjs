package com.project.yourjs;

import com.project.yourjs.db.entity.Graduate;
import com.project.yourjs.db.entity.Military;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.repository.MilitaryRepository;
import com.project.yourjs.db.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Date;

public class EntityTest extends YourjsApplicationTests {

    @Autowired
    UserRepository userRepository;

    @Autowired
    MilitaryRepository militaryRepository;

//    @Test
//    public void create() {
//        User user = new User("JUnittest", "JUnit테스트", "JUnit@your.com", "JUnit", "JUnit", 0);
//        Military military = new Military(user, "해군", "수송", new Date(1), new Date(1000), "fileSrc");
//
//        User savedUser = userRepository.save(user);
//        Military savedMilitary = militaryRepository.save(military);
//
//        Assertions.assertThat(savedUser.getUserSeq()).isEqualTo(userRepository.findUserByUserId(savedUser.getUserId()).getUserSeq());
//        Assertions.assertThat(savedMilitary.getMilitarySeq()).isEqualTo(militaryRepository.findById(savedMilitary.getMilitarySeq()).get().getMilitarySeq());
//    }
//
//    @Test
//    public void deleteUser() {
//        User user = userRepository.findUserByUserId("JUnittest");
//        userRepository.deleteById(user.getUserSeq());
//        Assertions.assertThat(userRepository.findUserByUserId("JUnittest")).isNull();
//    }


}

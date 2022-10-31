package com.project.yourjs;

import com.project.yourjs.db.entity.Follow;
import com.project.yourjs.db.entity.Graduate;
import com.project.yourjs.db.entity.Military;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.repository.FollowRepository;
import com.project.yourjs.db.repository.MilitaryRepository;
import com.project.yourjs.db.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.hibernate.Criteria;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import javax.management.Query;
import java.sql.Date;

public class EntityTest extends YourjsApplicationTests {

    @Autowired
    FollowRepository followRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    @Test
    public void insertTest() {
        Follow follow = new Follow();
        follow.setRequestUserId("req");
        follow.setResponseUserId("res");
        mongoTemplate.insert(follow);

        Follow comparedFollow = mongoTemplate.findById(follow.getId(), Follow.class);
        System.out.println(follow.getId());
        System.out.println(comparedFollow.getId());

        Assertions.assertThat(follow.getId().equals(comparedFollow.getId()));
        Assertions.assertThat(follow.getRequestUserId().equals((comparedFollow.getRequestUserId())));
        Assertions.assertThat(follow.getResponseUserId().equals(comparedFollow.getResponseUserId()));
    }

    @Test
    public void findTest() {
        Follow follow = mongoTemplate.findById("635f2ec758f6f1ccc117094a", Follow.class);
        System.out.println(follow.getId());
        Assertions.assertThat(follow != null);
    }


//    @Autowired
//    UserRepository userRepository;
//
//    @Autowired
//    MilitaryRepository militaryRepository;
//
////    @Test
////    public void create() {
////        User user = new User("JUnittest", "JUnit테스트", "JUnit@your.com", "JUnit", "JUnit", 0);
////        Military military = new Military(user, "해군", "수송", new Date(1), new Date(1000), "fileSrc");
////
////        User savedUser = userRepository.save(user);
////        Military savedMilitary = militaryRepository.save(military);
////
////        Assertions.assertThat(savedUser.getUserSeq()).isEqualTo(userRepository.findUserByUserId(savedUser.getUserId()).getUserSeq());
////        Assertions.assertThat(savedMilitary.getMilitarySeq()).isEqualTo(militaryRepository.findById(savedMilitary.getMilitarySeq()).get().getMilitarySeq());
////    }
////
////    @Test
////    public void deleteUser() {
////        User user = userRepository.findUserByUserId("JUnittest");
////        userRepository.deleteById(user.getUserSeq());
////        Assertions.assertThat(userRepository.findUserByUserId("JUnittest")).isNull();
////    }


}

package com.project.yourjs.api.service;

import com.project.yourjs.db.entity.Follow;
import com.project.yourjs.db.repository.FollowRepository;
import com.project.yourjs.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class FollowService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;

    public Object requestFollow(String requestUserId, String responseUserId) {
        Follow follow = Follow.builder().requestUserId(requestUserId).responseUserId(responseUserId).build();
        if (userRepository.findByUserId(responseUserId).isPresent()) {
            if (followRepository.findByRequestUserIdIsAndResponseUserId(requestUserId, responseUserId).isPresent()) {
                return "이미 요청을 보냈습니다";
            }
            followRepository.insert(follow);
            return follow;
        }
        return "없는 사용자입니다";
    }

    public Object deleteFollow(String requestUserId, String responseUserId) {
        Follow follow = followRepository.findByRequestUserIdIsAndResponseUserId(requestUserId, responseUserId).get();
        if (follow != null) {
            followRepository.deleteById(follow.getId());
            return true;
        }
        return false;
    }

    public Object getAllFollows(String requestUserId) {
        return followRepository.findAllByRequestUserId(requestUserId);
    }
}
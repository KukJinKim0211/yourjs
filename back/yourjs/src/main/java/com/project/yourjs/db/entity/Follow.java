package com.project.yourjs.db.entity;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "follow")
public class Follow {
    @Id
    private String id;

    @Field
    private String requestUserId;

    @Field
    private String responseUserId;

    @Builder
    public Follow(String requestUserId, String responseUserId) {
        this.requestUserId = requestUserId;
        this.responseUserId = responseUserId;
    }


}

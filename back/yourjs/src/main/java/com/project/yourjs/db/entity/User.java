package com.project.yourjs.db.entity;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User implements Serializable {

      @Id
      @GeneratedValue(strategy = GenerationType.AUTO)
      @Column(name = "user_seq")
      private Long userSeq;

      @Column(name = "user_id", unique = true, nullable = false)
      private String userId;

      @Column(name = "user_name", unique = true, nullable = false)
      private String userName;

      @Column(name = "email", nullable = true)
      private String email;

      @Column(name = "nickname", nullable = true)
      private String nickname;

      @JsonIgnore
      @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
      @Column(name = "password", nullable = false)
      private String password;

      @Column(name = "info_level", nullable = true)
      private Integer infoLevel;

      @CreationTimestamp
      @CreatedDate
      @Column(name = "reg_dtm", updatable = false, nullable = false)
      private LocalDateTime regDtm;

      @UpdateTimestamp
      @LastModifiedDate
      @Column(name = "mod_dtm", nullable = false)
      private LocalDateTime modDtm;

      @JsonIgnore
      @Column(name = "activated")
      private boolean activated;

      @ManyToMany
      @JoinTable(name = "user_authority", joinColumns = {
                  @JoinColumn(name = "user_id", referencedColumnName = "user_id") }, inverseJoinColumns = {
                              @JoinColumn(name = "authority_name", referencedColumnName = "authority_name") })
      private Set<Authority> authorities;
}

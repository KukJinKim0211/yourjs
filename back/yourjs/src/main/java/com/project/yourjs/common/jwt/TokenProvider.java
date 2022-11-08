package com.project.yourjs.common.jwt;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class TokenProvider implements InitializingBean {

   private final Logger logger = LoggerFactory.getLogger(TokenProvider.class);
   private static final String AUTHORITIES_KEY = "auth";
   private final String secret;
   private final String refreshSecret;
   private final long tokenValidityInMilliseconds;
   private final long refreshTokenValidityInMilliseconds;
   private Key key;
   private Key refreshKey;

   public TokenProvider(
         @Value("${jwt.secret}") String secret,
         @Value("${jwt.refreshSecret}") String refreshSecret,
         @Value("${jwt.token-validity-in-seconds}") long tokenValidityInSeconds,
         @Value("${jwt.refresh-token-validity-in-seconds}") long refreshTokenValidityInSeconds) {
      this.secret = secret;
      this.refreshSecret = refreshSecret;
      this.tokenValidityInMilliseconds = tokenValidityInSeconds * 1000;
      this.refreshTokenValidityInMilliseconds = refreshTokenValidityInSeconds * 1000;
   }

   @Override
   public void afterPropertiesSet() {
      byte[] keyBytes = Decoders.BASE64.decode(secret);
      byte[] refreshKeyBytes = Decoders.BASE64.decode(refreshSecret);
      this.key = Keys.hmacShaKeyFor(keyBytes);
      this.refreshKey = Keys.hmacShaKeyFor(refreshKeyBytes);
   }

   public String createToken(Authentication authentication) {
      String authorities = authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.joining(","));

      long now = (new Date()).getTime();
      Date validity = new Date(now + this.tokenValidityInMilliseconds);

      return Jwts.builder()
            .setSubject(authentication.getName())
            .claim(AUTHORITIES_KEY, authorities)
            .signWith(key, SignatureAlgorithm.HS512)
            .setExpiration(validity)
            .compact();
   }

   public String createRefreshToken(Authentication authentication) {
      String authorities = authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.joining(","));

      long now = (new Date()).getTime();
      Date validity = new Date(now + this.refreshTokenValidityInMilliseconds);

      return Jwts.builder()
            .setSubject(authentication.getName())
            .claim(AUTHORITIES_KEY, authorities)
            .signWith(refreshKey, SignatureAlgorithm.HS512)
            .setExpiration(validity)
            .compact();
   }

   public Authentication getAuthentication(String token) {
      Claims claims = Jwts
            .parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody();

      Collection<? extends GrantedAuthority> authorities = Arrays
            .stream(claims.get(AUTHORITIES_KEY).toString().split(","))
            .map(SimpleGrantedAuthority::new)
            .collect(Collectors.toList());

      User principal = new User(claims.getSubject(), "", authorities);

      return new UsernamePasswordAuthenticationToken(principal, token, authorities);
   }

   public Authentication getRefreshAuthentication(String refreshToken) {
      Claims claims = Jwts
            .parserBuilder()
            .setSigningKey(refreshKey)
            .build()
            .parseClaimsJws(refreshToken)
            .getBody();

      Collection<? extends GrantedAuthority> authorities = Arrays
            .stream(claims.get(AUTHORITIES_KEY).toString().split(","))
            .map(SimpleGrantedAuthority::new)
            .collect(Collectors.toList());

      User principal = new User(claims.getSubject(), "", authorities);

      return new UsernamePasswordAuthenticationToken(principal, refreshToken, authorities);
   }

   public String validateToken(String token) {
      try {
         Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
         return "valid";
      } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
         logger.info("잘못된 JWT 서명입니다.");
      } catch (ExpiredJwtException e) {
         logger.info("만료된 JWT 토큰입니다.");
         return "expired";
      } catch (UnsupportedJwtException e) {
         logger.info("지원되지 않는 JWT 토큰입니다.");
      } catch (IllegalArgumentException e) {
         logger.info("JWT 토큰이 잘못되었습니다.");
      }
      return "denied";
   }

   public String validateRefreshToken(String refreshToken) {
      try {
         Jwts.parserBuilder().setSigningKey(refreshKey).build().parseClaimsJws(refreshToken);
         return "valid";
      } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
         logger.info("잘못된 JWT 서명입니다.");
      } catch (ExpiredJwtException e) {
         logger.info("만료된 JWT 토큰입니다.");
         return "expired";
      } catch (UnsupportedJwtException e) {
         logger.info("지원되지 않는 JWT 토큰입니다.");
      } catch (IllegalArgumentException e) {
         logger.info("JWT 토큰이 잘못되었습니다.");
      }
      return "denied";
   }
}

package com.safalifter.auction.repository;

import com.safalifter.auction.model.Token;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.concurrent.TimeUnit;

@Repository
@RequiredArgsConstructor
public class TokenRepository {
    private final RedisTemplate<String, String> template;

    public Token save(Token token, Long expiredTime) {
        template.opsForValue().set(token.getUsername(), token.getJwt(), expiredTime, TimeUnit.HOURS);
        return token;
    }

    public void delete(String username) {
        template.opsForValue().getAndDelete(username);
    }
}

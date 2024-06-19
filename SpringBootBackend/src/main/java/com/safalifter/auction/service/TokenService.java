package com.safalifter.auction.service;

import com.safalifter.auction.model.Token;
import com.safalifter.auction.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final TokenRepository tokenRepository;

    public Token saveToken(Token token, Long expiredTime) {
        return tokenRepository.save(token, expiredTime);
    }

    public void delete(String username) {
        tokenRepository.delete(username);
    }
}

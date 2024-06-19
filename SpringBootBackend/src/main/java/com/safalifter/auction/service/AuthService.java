package com.safalifter.auction.service;

import com.safalifter.auction.exc.WrongCredentialsException;
import com.safalifter.auction.model.Token;
import com.safalifter.auction.model.User;
import com.safalifter.auction.request.LoginRequest;
import com.safalifter.auction.request.RegisterRequest;
import com.safalifter.auction.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final TokenService tokenService;

    public Token login(LoginRequest request) {
        try {
            Authentication auth = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            final String jwt = jwtUtil.generateToken(auth);
            return tokenService.saveToken(
                    Token.builder()
                            .jwt(jwt)
                            .username(request.getUsername()).build(),
                    jwtUtil.tokenExpiredHours(jwt));
        } catch (final BadCredentialsException badCredentialsException) {
            throw new WrongCredentialsException("Invalid Username or Password");
        }
    }

    public User signup(RegisterRequest request) {
        return userService.create(request);
    }

    public void logout(String auth) {
        String jwt = auth.substring(6);
        String username = jwtUtil.extractUsername(jwt);
        tokenService.delete(username);
    }
}
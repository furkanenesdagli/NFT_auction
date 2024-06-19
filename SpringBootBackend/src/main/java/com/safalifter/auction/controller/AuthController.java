package com.safalifter.auction.controller;

import com.safalifter.auction.dto.UserDto;
import com.safalifter.auction.model.Token;
import com.safalifter.auction.request.LoginRequest;
import com.safalifter.auction.request.RegisterRequest;
import com.safalifter.auction.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final ModelMapper modelMapper;

    @PostMapping("/login")
    ResponseEntity<Token> handleLogin(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/signup")
    ResponseEntity<UserDto> handleSignUp(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(modelMapper.map(authService.signup(request), UserDto.class));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader(name = "Authorization") String auth) {
        authService.logout(auth);
        return ResponseEntity.ok().build();
    }
}
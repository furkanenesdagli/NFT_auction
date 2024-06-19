package com.safalifter.auction.controller;

import com.safalifter.auction.dto.UserDto;
import com.safalifter.auction.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final ModelMapper modelMapper;

    @GetMapping
    ResponseEntity<List<UserDto>> getUsers() {
        return ResponseEntity.ok(userService.getUsers().stream()
                .map(x -> modelMapper.map(x, UserDto.class)).collect(Collectors.toList()));
    }
}

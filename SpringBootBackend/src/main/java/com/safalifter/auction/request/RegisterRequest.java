package com.safalifter.auction.request;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
public class RegisterRequest {
    @NotBlank(message = "Username mustn't be blank")
    private String username;

    @NotBlank(message = "Password mustn't be blank")
    @Size(min = 8, max = 16)
    @Pattern(message = "Password must have at least 1 uppercase 1 lowercase and 1 number",
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$")
    private String password;
}

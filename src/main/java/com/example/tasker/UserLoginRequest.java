package com.example.tasker;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class UserLoginRequest {
    @NotBlank
    private String username;

    @Getter
    @NotBlank
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String usernameOrEmail) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

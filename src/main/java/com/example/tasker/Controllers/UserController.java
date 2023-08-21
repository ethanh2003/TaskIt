package com.example.tasker.Controllers;

import com.example.tasker.Classes.LoginResponse;
import com.example.tasker.Request.UserLoginRequest;
import com.example.tasker.Request.UserRegistrationRequest;
import com.example.tasker.Service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegistrationRequest registrationRequest) {
        userService.registerUser(registrationRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginRequest loginRequest) {
        if (userService.loginUser(loginRequest)) {
            Long userId = userService.getUserIdByUsername(loginRequest.getUsername());
            String token = Jwts.builder()
                    .setSubject(String.valueOf(userId))
                    .claim("userId", userId)
                    .signWith(SignatureAlgorithm.HS256, "6fsdukr1")
                    .compact();

            HttpHeaders headers = new HttpHeaders();
            headers.add("Access-Control-Allow-Origin", "http://localhost:3000");

            return ResponseEntity.ok(new LoginResponse(token, userId));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }



}

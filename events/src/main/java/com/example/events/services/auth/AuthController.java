package com.example.events.services.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.events.services.auth.business.AuthService;
import com.example.events.services.auth.persistence.LoginDto;
import com.example.events.services.auth.security.JwtAuthResponse;
import com.example.events.services.user.persistence.UserDto;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<Void> signUp(@RequestBody UserDto userDto) {
        authService.signUp(userDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthResponse> signIn(@RequestBody LoginDto loginDto) {
        String token = authService.signIn(loginDto);

        JwtAuthResponse response = new JwtAuthResponse();
        response.setAccessToken(token);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

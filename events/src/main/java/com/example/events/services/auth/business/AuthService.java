package com.example.events.services.auth.business;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.events.services.auth.persistence.LoginDto;
import com.example.events.services.auth.security.JwtTokenProvider;
import com.example.events.services.user.business.UserService;
import com.example.events.services.user.persistence.UserDto;

@Service
public class AuthService {
    
    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public UserDto signUp(UserDto userDto) {
        return userService.addUser(userDto);
    }

    public String signIn(LoginDto loginDto) {
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
            loginDto.getUsername(),
            loginDto.getPassword()
        ));
        SecurityContextHolder.getContext().setAuthentication(auth);
        String token = jwtTokenProvider.generateToken(auth);
        return token;
    }
}

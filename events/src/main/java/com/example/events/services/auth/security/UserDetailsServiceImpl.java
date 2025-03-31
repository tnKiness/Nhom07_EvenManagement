package com.example.events.services.auth.security;

import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.events.services.user.persistence.User;
import com.example.events.services.user.persistence.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not exists"));

        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().name());
        Set<GrantedAuthority> authorities = Set.of(authority);

        return new org.springframework.security.core.userdetails.User(username, user.getPassword(), authorities);
    }
}

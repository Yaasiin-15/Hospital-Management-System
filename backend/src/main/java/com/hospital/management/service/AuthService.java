package com.hospital.management.service;

import com.hospital.management.dto.request.LoginRequest;
import com.hospital.management.dto.request.RegisterRequest;
import com.hospital.management.dto.response.AuthResponse;
import com.hospital.management.model.User;
import com.hospital.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthResponse login(LoginRequest loginRequest) {
        // Mock implementation - replace with actual JWT logic
        User user = userRepository.findByEmail(loginRequest.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = "mock-jwt-token"; // Replace with actual JWT generation
        
        return new AuthResponse(token, user.getId(), user.getUsername(), user.getEmail(), user.getRole());
    }

    public AuthResponse register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole(registerRequest.getRole() != null ? registerRequest.getRole() : User.UserRole.PATIENT);

        user = userRepository.save(user);

        String token = "mock-jwt-token"; // Replace with actual JWT generation
        
        return new AuthResponse(token, user.getId(), user.getUsername(), user.getEmail(), user.getRole());
    }
}
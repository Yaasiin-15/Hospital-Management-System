package com.hospital.management.config;

import com.hospital.management.model.User;
import com.hospital.management.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Profile("!prod")
public class DataInitializer {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void initializeData() {
        // Create default users if they don't exist
        if (userRepository.count() == 0) {
            createDefaultUsers();
        }
    }

    private void createDefaultUsers() {
        List<User> defaultUsers = List.of(
            new User(
                "admin", 
                "admin@hospital.com", 
                passwordEncoder.encode("password"), 
                User.UserRole.ADMIN
            ),
            new User(
                "doctor", 
                "doctor@hospital.com", 
                passwordEncoder.encode("password"), 
                User.UserRole.DOCTOR
            ),
            new User(
                "nurse", 
                "nurse@hospital.com", 
                passwordEncoder.encode("password"), 
                User.UserRole.NURSE
            ),
            new User(
                "receptionist", 
                "receptionist@hospital.com", 
                passwordEncoder.encode("password"), 
                User.UserRole.RECEPTIONIST
            ),
            new User(
                "patient", 
                "patient@hospital.com", 
                passwordEncoder.encode("password"), 
                User.UserRole.PATIENT
            )
        );

        userRepository.saveAll(defaultUsers);
    }
}
```
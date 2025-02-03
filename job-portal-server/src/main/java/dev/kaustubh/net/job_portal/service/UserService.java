package dev.kaustubh.net.job_portal.service;

import dev.kaustubh.net.job_portal.model.User;
import dev.kaustubh.net.job_portal.repository.UserRepository;
import dev.kaustubh.net.job_portal.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User userById(String id){
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found!"));
    }

    public User userByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User with email " + email + " not found."));
    }

    public List<User> allUsers(){
        return userRepository.findAll();
    }

    public User registerUser(User user){
        if (user.getId() == null || user.getId().isEmpty()) {
            user.setId(null);
        }

        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        return mongoTemplate.save(user);
    }

    @Autowired
    private JwtUtil jwtUtil;

    public String login(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        return jwtUtil.generateToken(email);
    }

    public User updateUser(String id, User userUpdates) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (userUpdates.getName() != null) {
            existingUser.setName(userUpdates.getName());
        }
        if (userUpdates.getEmail() != null) {
            existingUser.setEmail(userUpdates.getEmail());
        }
        if (userUpdates.getPassword() != null) {
            existingUser.setPassword(passwordEncoder.encode((userUpdates.getPassword())));
        }
        if (userUpdates.getRole() != null) {
            existingUser.setRole(userUpdates.getRole());
        }
        if (userUpdates.getSkills() != null) {
            List<String> existingSkills = existingUser.getSkills();
            if(existingSkills != null){
                userUpdates.getSkills().forEach(skill -> {
                    if (!existingSkills.contains(skill)) {
                        existingSkills.add(skill);
                    }
                });
            }else {
                existingUser.setSkills(userUpdates.getSkills());
            }
        }

        return userRepository.save(existingUser);
    }
}

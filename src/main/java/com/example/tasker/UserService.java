package com.example.tasker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TaskService taskService;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, TaskService taskService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.taskService = taskService;
    }


    public void registerUser(UserRegistrationRequest registrationRequest) {
        String encodedPassword = passwordEncoder.encode(registrationRequest.getPassword());
        User newUser = new User(registrationRequest.getUsername(), registrationRequest.getEmail(), encodedPassword);
        userRepository.save(newUser);
    }

    public boolean loginUser(UserLoginRequest loginRequest) {
        Optional<User> user = userRepository.findByUsername(loginRequest.getUsername());
        return user.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), user.get().getPassword());
    }


    public List<Task> getUserTasks(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return taskService.getUserTasks(user.get().getId());
        } else {
            throw new UsernameNotFoundException("User not found");
        }
    }
}

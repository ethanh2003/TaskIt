package com.example.tasker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TaskService taskService;
    private final EntityManager entityManager;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, TaskService taskService, EntityManager entityManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.taskService = taskService;
        this.entityManager = entityManager;
    }

    public void registerUser(UserRegistrationRequest registrationRequest) {
        String encodedPassword = passwordEncoder.encode(registrationRequest.getPassword());
        User newUser = new User(registrationRequest.getUsername(), registrationRequest.getEmail(), encodedPassword);
        userRepository.save(newUser);
    }

    public boolean loginUser(@RequestBody UserLoginRequest loginRequest) {
        System.out.println("Login Request: " + loginRequest.getUsername() + ", " + loginRequest.getPassword());

        Optional<User> user = findByUsername(loginRequest.getUsername());
        return user.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), user.get().getPassword());
    }

    @Transactional
    public Optional<User> findByUsername(String username) {
        String jpql = "SELECT u FROM User u WHERE u.username = :username";

        try {
            User user = entityManager.createQuery(jpql, User.class)
                    .setParameter("username", username)
                    .setMaxResults(1) // Limit the result to at most one user
                    .getSingleResult();
            return Optional.ofNullable(user);
        } catch (NoResultException ex) {
            System.out.println("User not found for username: " + username);
            return Optional.empty();
        }
    }









    public List<Task> getUserTasks(String username) {
        Optional<User> user = findByUsername(username);
        if (user.isPresent()) {
            return taskService.getUserTasks(user.get().getId());
        } else {
            throw new UsernameNotFoundException("User not found");
        }
    }
}

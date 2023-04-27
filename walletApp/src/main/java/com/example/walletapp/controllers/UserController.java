package com.example.walletapp.controllers;

import com.example.walletapp.models.User;
import com.example.walletapp.repositories.UserRepository;
import com.example.walletapp.services.UserService;
import com.example.walletapp.utils.Response;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    private List<User> userList = new ArrayList<>();


    @PostMapping("/signup")
    public ResponseEntity<?> createNewUser(@RequestBody User user){
        return userService.createUser(user);
    }

    @GetMapping()
    public ResponseEntity<?> getAllUsers(){
        return userService.getAllUsers();
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginExistingUser(@RequestBody Response response){
        userList = userRepository.findAll();
        Optional<User> optionalUser = userList.stream().filter(user -> {
            return user.getUsername().equals(response.getUsername()) && user.getPassword().equals(response.getPassword());
        }).findFirst();
        return userService.authenticateUser(response);
    }

}

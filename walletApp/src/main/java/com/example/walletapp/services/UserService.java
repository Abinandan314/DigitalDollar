package com.example.walletapp.services;

import com.example.walletapp.models.User;
import com.example.walletapp.repositories.UserRepository;
import com.example.walletapp.utils.Response;
import com.example.walletapp.utils.UserSessionDTO;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Slf4j
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private WalletService walletService;
    private List<User> userList = new ArrayList<>();

    public boolean validateUser(User user){
        return userRepository.findByUsername(user.getUsername()).isPresent();
    }

    public ResponseEntity<?> createUser(User user){
        if(validateUser(user)) {
            log.error("User with provided username already exists");
            return new ResponseEntity<String>("User with provided username already exists", HttpStatus.NOT_ACCEPTABLE);
        }
        if(userRepository.findByEmail(user.getEmail()).isPresent()){
            log.error("User with provided Email already exists");
            return new ResponseEntity<String>("User with provided Email already exists", HttpStatus.NOT_ACCEPTABLE);
        }
        userRepository.save(user);
        walletService.createWallet(user);
        log.info("Successfully Registered");
        return new ResponseEntity<User>(user,HttpStatus.CREATED);
    }

    public ResponseEntity<?> getAllUsers(){
        return new ResponseEntity<List<User>>(userRepository.findAll(),HttpStatus.OK);
    }

    public ResponseEntity<?> authenticateUser(Response response){
        userList = userRepository.findAll();
        Optional<User> optionalUser = userList.stream().filter(user -> {
            return user.getUsername().equals(response.getUsername()) && user.getPassword().equals(response.getPassword());
        }).findFirst();
        if(!optionalUser.isPresent()){
            log.error("Invalid Credentials");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid Credentials");
        }
        User checkuser = optionalUser.get();
        String token = Jwts.builder()
                .claim("username",checkuser.getUsername())
                .claim("id",checkuser.getId()).signWith(SignatureAlgorithm.HS256,"abinandan20014658asdasdasdasdasdasdasdasdasdasdasdasd").compact();
        UserSessionDTO userSessionDTO = new UserSessionDTO();
        userSessionDTO.setUser(checkuser);
        userSessionDTO.setToken(token);
//        Optional<User> user = userRepository.findByUsername(response.getUsername());
//        if(user.isPresent() && response.getPassword().equals(user.get().getPassword())){
//            log.info("Successfully Logged In");
//            return new ResponseEntity<User>(user.get(),HttpStatus.OK);
//        }

        return new ResponseEntity<UserSessionDTO>(userSessionDTO,HttpStatus.OK);
    }
}

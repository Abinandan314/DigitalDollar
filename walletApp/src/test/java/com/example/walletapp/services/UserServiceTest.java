package com.example.walletapp.services;

import com.example.walletapp.controllers.UserController;
import com.example.walletapp.models.User;
import com.example.walletapp.repositories.UserRepository;
import com.example.walletapp.repositories.WalletRepository;
import com.example.walletapp.utils.Response;
import jakarta.servlet.http.HttpSession;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpSession;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureDataMongo
class UserServiceTest {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private UserController userController;
    private User user;
    @BeforeEach
    public void init(){
        user = new User("Test Id","testUsername","password","test@mail.com");
    }
    @Test
    void validateUser() {
        userRepository.save(user);
        assertTrue(userService.validateUser(user));
    }
    @Test
    void testAddUser(){
        ResponseEntity<?> savedEntity = userService.createUser(user);
        ResponseEntity response = new ResponseEntity(HttpStatus.CREATED);
        assertEquals(response.getStatusCode(),savedEntity.getStatusCode());

        ResponseEntity<?> savedEntity1 = userController.createNewUser(user);
        ResponseEntity response1 = new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
        assertEquals(response1.getStatusCode(),savedEntity1.getStatusCode());

        User user1 = new User("testId1","testUsernamesample","password","test@mail.com");
        ResponseEntity<?> responseEntity = userController.createNewUser(user1);
        assertEquals(HttpStatus.NOT_ACCEPTABLE,responseEntity.getStatusCode());

    }

    @Test
    void testAuthentication(){
        MockHttpServletRequest session = new MockHttpServletRequest();
        userRepository.save(user);
        ResponseEntity<?> savedEntity = userService.authenticateUser(new Response("testUsername","password"));
        ResponseEntity response = new ResponseEntity(HttpStatus.OK);
        assertEquals(response.getStatusCode(),savedEntity.getStatusCode());

        ResponseEntity<?> savedEntity1 = userController.loginExistingUser(new Response("testUsername1","password"));
        ResponseEntity response1 = new ResponseEntity(HttpStatus.FORBIDDEN);
        assertEquals(response1.getStatusCode(),savedEntity1.getStatusCode());

    }
    @Test
    public void testAllUsers(){
        userRepository.save(user);
        ResponseEntity<?> savedList = userService.getAllUsers();
        ResponseEntity response = new ResponseEntity(HttpStatus.OK);
        assertEquals(response.getStatusCode(),savedList.getStatusCode());

        ResponseEntity<?> savedList1 = userController.getAllUsers();
        ResponseEntity response1 = new ResponseEntity(HttpStatus.OK);
        assertEquals(response1.getStatusCode(),savedList1.getStatusCode());


    }
    @AfterEach
    public void cleanUp(){
        userRepository.delete(user);
        walletRepository.deleteByUser(user);
    }
}
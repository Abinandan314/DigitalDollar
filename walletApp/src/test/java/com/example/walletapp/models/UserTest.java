package com.example.walletapp.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
class UserTest {
    private User user;

    @BeforeEach
    public void presetup(){
        user = new User("testId","testUser","password","testEmail");
    }

    @Test
    public void testUserPOJO(){
        user.setUsername("userTest");
        user.setPassword("testpass");
        user.setEmail("testEmail");
        user.setId("testId");
        assertEquals(user.getId(),"testId");
        assertEquals(user.getPassword(),"testpass");
        assertEquals(user.getUsername(),"userTest");
        assertEquals(user.getEmail(),"testEmail");

    }

}
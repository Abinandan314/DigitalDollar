package com.example.walletapp.controllers;

import com.example.walletapp.models.Transaction;
import com.example.walletapp.models.User;
import com.example.walletapp.repositories.TransactionRepository;
import com.example.walletapp.services.TransactionService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@AutoConfigureDataMongo
class TransactionControllerTest {
    @Autowired
    private TransactionController transactionController;
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private TransactionService transactionService;
    private User user;
    private String token;
    private Transaction transaction,transaction1;
    @BeforeEach
    public void setup(){
        transaction = new Transaction("transactionID","testSenderUsername"
                ,"testReceiverUsername",100, LocalDateTime.now());
        transaction1 = new Transaction("transactionID1","testReceiverUsername"
                ,"testSenderUsername",101, LocalDateTime.now());
        token = Jwts.builder()
                .claim("username","testUsername")
                .claim("id","testId").signWith(SignatureAlgorithm.HS256,"abinandan20014658asdasdasdasdasdasdasdasdasdasdasdasd").compact();
        transactionRepository.save(transaction);
        transactionRepository.save(transaction1);
    }
    @Test
    void getAllTransactionForUser() {
        String requestToken = "Bearer " + token;
        ResponseEntity<?> responseEntity = transactionController.getAllTransactionForUser("testSenderUsername",requestToken);
        ResponseEntity<?> responseEntityNotFound = transactionController.getAllTransactionForUser("sample",requestToken);

        assertEquals(HttpStatus.OK,responseEntity.getStatusCode());
        assertEquals(HttpStatus.NOT_FOUND,responseEntityNotFound.getStatusCode());
        assertEquals(2,transactionService.getAllTransactionsOfUser("testSenderUsername").size());
    }
    @AfterEach
    public void demolish(){
        transactionRepository.delete(transaction1);
        transactionRepository.delete(transaction);
    }
}
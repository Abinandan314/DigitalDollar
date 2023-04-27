package com.example.walletapp.controllers;

import com.example.walletapp.models.Cashback;
import com.example.walletapp.models.User;
import com.example.walletapp.models.Wallet;
import com.example.walletapp.repositories.CashbackRepository;
import com.example.walletapp.repositories.WalletRepository;
import com.example.walletapp.services.CashbackService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@AutoConfigureDataMongo
class CashbackControllerTest {
    @Autowired
    private CashbackRepository cashbackRepository;
    @Autowired
    private CashbackService cashbackService;
    @Autowired
    private CashbackController cashbackController;
    @Autowired
    private WalletRepository walletRepository;
    private Cashback cashback;
    @BeforeEach
    public void setup(){
        cashback = new Cashback("testCashbackId","testUsername",20);
        cashbackRepository.save(cashback);
    }

    @Test
    void getAllUserCashbacks() {
        ResponseEntity<?> responseEntityPositive = cashbackController.getAllUserCashbacks("testUsername");
        assertEquals(HttpStatus.OK,responseEntityPositive.getStatusCode());

        ResponseEntity<?> responseEntityNeg = cashbackController.getAllUserCashbacks("sample");
        assertEquals(HttpStatus.NOT_FOUND,responseEntityNeg.getStatusCode());
    }

    @Test
    void claimCashback() {
        ResponseEntity<?> responseEntityNeg = cashbackController.claimCashback("sample");
        assertEquals(HttpStatus.NOT_FOUND,responseEntityNeg.getStatusCode());

        User user = new User("testId","testUsername","password","test@mail.com");
        Wallet wallet = new Wallet("testWallet",user,"testUsername",110);
        walletRepository.save(wallet);

        ResponseEntity<?> responseEntityPos = cashbackController.claimCashback("testCashbackId");
        assertEquals(130,walletRepository.findByUsername("testUsername").get().getTotalBalance());

        walletRepository.delete(wallet);
    }

    @AfterEach
    public void demolish(){
        cashbackRepository.delete(cashback);
    }
}
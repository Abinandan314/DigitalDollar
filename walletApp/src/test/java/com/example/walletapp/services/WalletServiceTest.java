package com.example.walletapp.services;

import com.example.walletapp.controllers.WalletController;
import com.example.walletapp.models.User;
import com.example.walletapp.models.Wallet;
import com.example.walletapp.repositories.WalletRepository;
import com.example.walletapp.utils.BalanceDTO;
import com.example.walletapp.utils.TransferAmountDTO;
import com.example.walletapp.utils.UserSessionDTO;
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
import org.springframework.mock.web.MockHttpServletRequest;

import static org.junit.jupiter.api.Assertions.*;
@AutoConfigureDataMongo
@SpringBootTest
class WalletServiceTest {
    @Autowired
    private WalletController walletController;
    @Autowired
    private WalletRepository walletRepository;
    private User user;
    private Wallet wallet;
    private String token;
    @BeforeEach
    public void setup(){
        user = new User("Test Id","testUsername","password","test@mail.com");
        token = Jwts.builder()
                .claim("username",user.getUsername())
                .claim("id",user.getId()).signWith(SignatureAlgorithm.HS256,"abinandan20014658asdasdasdasdasdasdasdasdasdasdasdasd").compact();


        wallet = new Wallet("testWallet",user,"testUsername",110);
        walletRepository.save(wallet);
    }
    @Test
    void getUserWallet() {
        String requestToken = "Bearer " + token;
        System.out.println(requestToken);

        ResponseEntity<?> responseEntity = walletController.getUserWallet("testUsername",requestToken);
        ResponseEntity<?> responseEntityForNot = walletController.getUserWallet("sample",requestToken);
        assertEquals(HttpStatus.OK,responseEntity.getStatusCode());
        assertEquals(HttpStatus.NOT_FOUND,responseEntityForNot.getStatusCode());
    }

    @Test
    void updateWalletBalance() {
        String requestToken = "Bearer " + token;
        ResponseEntity<?> responseEntityForNot = walletController.updateWalletBalance("sample",new BalanceDTO(100),requestToken);
        ResponseEntity<?> responseEntity = walletController.updateWalletBalance("testUsername",new BalanceDTO(100),requestToken);
        ResponseEntity<?> responseEntityForAmount = walletController.updateWalletBalance("testUsername",new BalanceDTO(0),requestToken);

        assertNotEquals(wallet.getTotalBalance(),walletRepository.findByUsername("testUsername").get().getTotalBalance());
        assertEquals(HttpStatus.NOT_FOUND,responseEntityForNot.getStatusCode());
        assertEquals(HttpStatus.NOT_ACCEPTABLE,responseEntityForAmount.getStatusCode());
    }

    @Test
    void transferAmountToAnotherUser() {
        String requestToken = "Bearer " + token;
        ResponseEntity<?> responseEntity = walletController.transferAmount("testUsername",new TransferAmountDTO("testUsername",10),requestToken);
        assertEquals(HttpStatus.OK,responseEntity.getStatusCode());

        ResponseEntity<?> responseEntityForSenderUser = walletController.transferAmount("sample",new TransferAmountDTO("testUsername",10),requestToken);
        assertEquals(HttpStatus.NOT_FOUND,responseEntityForSenderUser.getStatusCode());

        ResponseEntity<?> responseEntityForRecUser = walletController.transferAmount("testUsername",new TransferAmountDTO("sample",10),requestToken);
        assertEquals(HttpStatus.NOT_FOUND,responseEntityForRecUser.getStatusCode());

        ResponseEntity<?> responseEntityForAmount = walletController.transferAmount("testUsername",new TransferAmountDTO("testUsername",0),requestToken);
        assertEquals(HttpStatus.NOT_ACCEPTABLE,responseEntityForAmount.getStatusCode());

        ResponseEntity<?> responseEntityForBalance = walletController.transferAmount("testUsername",new TransferAmountDTO("testUsername",200),requestToken);
        assertEquals(HttpStatus.NOT_ACCEPTABLE,responseEntityForBalance.getStatusCode());



    }
    @AfterEach
    public void demolish(){
        walletRepository.delete(wallet);
    }
}
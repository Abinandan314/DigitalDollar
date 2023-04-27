package com.example.walletapp.controllers;

import com.example.walletapp.models.Wallet;
import com.example.walletapp.repositories.WalletRepository;
import com.example.walletapp.services.WalletService;
import com.example.walletapp.utils.BalanceDTO;
import com.example.walletapp.utils.TransferAmountDTO;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.JwtParserBuilder;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.security.Principal;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/wallets")
@Scope("session")
public class WalletController {
    @Autowired
    private WalletRepository walletRepository;
    @Autowired
    private WalletService walletService;

    @GetMapping("/{username}")
    public ResponseEntity<?> getUserWallet(@PathVariable(name = "username") String username,@RequestHeader(name = "Authorization") String authorization){
        String token =  authorization.substring(7);
        JwtParser parser = Jwts.parserBuilder().setSigningKey("abinandan20014658asdasdasdasdasdasdasdasdasdasdasdasd").build();
        parser.parse(token);
        return walletService.getUserWallet(username);
    }

    @PostMapping("/{username}/balance")
    public ResponseEntity<?> updateWalletBalance(@PathVariable(name = "username") String username, @RequestBody BalanceDTO balanceDTO,@RequestHeader(name = "Authorization") String authorization){
        String token =  authorization.substring(7);
        JwtParser parser = Jwts.parserBuilder().setSigningKey("abinandan20014658asdasdasdasdasdasdasdasdasdasdasdasd").build();
        parser.parse(token);
        return walletService.updateWalletBalance(username,balanceDTO.getBalance());
    }
    @PostMapping("/{username}/transfer")
    public ResponseEntity<?> transferAmount(@PathVariable(name = "username") String username, @RequestBody TransferAmountDTO transferAmountDTO,@RequestHeader(name = "Authorization") String authorization){
        String token =  authorization.substring(7);
        JwtParser parser = Jwts.parserBuilder().setSigningKey("abinandan20014658asdasdasdasdasdasdasdasdasdasdasdasd").build();
        parser.parse(token);
        return walletService.transferAmountToAnotherUser(username,transferAmountDTO);
    }
}

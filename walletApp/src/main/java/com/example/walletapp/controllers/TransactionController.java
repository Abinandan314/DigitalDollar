package com.example.walletapp.controllers;

import com.example.walletapp.models.Transaction;
import com.example.walletapp.models.User;
import com.example.walletapp.repositories.UserRepository;
import com.example.walletapp.services.EmailService;
import com.example.walletapp.services.TransactionService;
import com.example.walletapp.utils.Response;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RequestMapping("/transactions")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @GetMapping("/{username}")
    public ResponseEntity<?> getAllTransactionForUser(@PathVariable(name = "username") String username,@RequestHeader(name = "Authorization") String authorization){
        String token =  authorization.substring(7);
        JwtParser parser = Jwts.parserBuilder().setSigningKey("abinandan20014658asdasdasdasdasdasdasdasdasdasdasdasd").build();
        parser.parse(token);
        List<Optional<Transaction>> listOfTransactionsOptional = transactionService.getAllTransactionsOfUser(username);
        List<Transaction> list = listOfTransactionsOptional.stream().flatMap(Optional::stream).collect(Collectors.toList());
        if(list.size() <= 0){
            return new ResponseEntity<String>("No Transactions Found",HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<List<Transaction>>(list,HttpStatus.OK);
    }

}

package com.example.walletapp.services;

import com.example.walletapp.models.Transaction;
import com.example.walletapp.models.User;
import com.example.walletapp.repositories.TransactionRepository;
import com.example.walletapp.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;
@Slf4j
@Service
public class TransactionService{
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailService emailService;

    public ResponseEntity<?> addTransaction(String senderUsername,String receiverUsername,double transferAmount){
        Transaction transaction = new Transaction();
        transaction.setSenderUsername(senderUsername);
        transaction.setReceiverUsername(receiverUsername);
        transaction.setTransferAmount(transferAmount);
        transaction.setCreatedAt(LocalDateTime.now());
        transactionRepository.save(transaction);
        Optional<User> user = userRepository.findByUsername(receiverUsername);
//        emailService.sendEmail(user.get().getEmail(), transferAmount);
        log.info("Email sent to the receiver");
        return new ResponseEntity<>(transaction, HttpStatus.OK);
    }

    public List<Optional<Transaction>> getAllTransactionsOfUser(String username){
        List<Optional<Transaction>> senderData = transactionRepository.findAllBySenderUsername(username);
        List<Optional<Transaction>> receiverData = transactionRepository.findAllByReceiverUsername(username);
        List<Optional<Transaction>> newList = new ArrayList<>();
        Stream.of(senderData,receiverData).forEach(newList::addAll);
        log.info("Transfer List Retrieval : Sucess");
        return newList;
    }
}

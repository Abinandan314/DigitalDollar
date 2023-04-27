package com.example.walletapp.services;

import com.example.walletapp.models.User;
import com.example.walletapp.models.Wallet;
import com.example.walletapp.repositories.WalletRepository;
import com.example.walletapp.utils.BalanceDTO;
import com.example.walletapp.utils.TransferAmountDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Slf4j
@Service
public class WalletService{
    @Autowired
    private WalletRepository walletRepository;
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private CashbackService cashbackService;

    public void createWallet(User user){
        Wallet wallet = new Wallet();
        wallet.setUser(user);
        wallet.setTotalBalance(0);
        wallet.setUsername(user.getUsername());
        walletRepository.save(wallet);
    }
    public ResponseEntity<?> getUserWallet(String username){

        Optional<Wallet> wallet = walletRepository.findByUsername(username);
        if (!wallet.isPresent()){
            log.error("User with given username not found");
            return new ResponseEntity<String>("User with given username not found", HttpStatus.NOT_FOUND);
        }
        log.info("Getting User Wallet : Success");
        return new ResponseEntity<Wallet>(wallet.get(),HttpStatus.OK);
    }

    public ResponseEntity<?> updateWalletBalance(String username, double balance){
        Optional<Wallet> wallet = walletRepository.findByUsername(username);
        if (!wallet.isPresent()){
            log.error("User with given username not found");
            return new ResponseEntity<String>("User with given username not found", HttpStatus.NOT_FOUND);
        }
        if(balance == 0){
            log.error("Please provide appropiate amount");
            return new ResponseEntity<String>("Please provide appropiate amount", HttpStatus.NOT_ACCEPTABLE);
        }
        double updatedTotalBalance = wallet.get().getTotalBalance() + balance;
        wallet.get().setTotalBalance(updatedTotalBalance);
        walletRepository.save(wallet.get());
        cashbackService.createCashback(username);
        log.info("Wallet Amount Recharged");
        return new ResponseEntity<Wallet>(wallet.get(),HttpStatus.OK);
    }

    public ResponseEntity<?> transferAmountToAnotherUser(String username,TransferAmountDTO transferAmountDTO){
        Optional<Wallet> senderWallet = walletRepository.findByUsername(username);
        Optional<Wallet> receiverWallet = walletRepository.findByUsername(transferAmountDTO.getUsername());
        double transferAmount = transferAmountDTO.getTransferAmount();
        if(!senderWallet.isPresent()){
            log.error("User with given username not found");
            return new ResponseEntity<String>("User with given username not found", HttpStatus.NOT_FOUND);
        }
        if(!receiverWallet.isPresent()){
            log.error("User with given username not found");
            return new ResponseEntity<String>("User with given username not found", HttpStatus.NOT_FOUND);
        }
        if(transferAmountDTO.getTransferAmount() <= 0){
            log.error("Please provide appropiate amount");
            return new ResponseEntity<String>("Please provide appropiate amount", HttpStatus.NOT_ACCEPTABLE);
        }
        double updatedSenderWallet = senderWallet.get().getTotalBalance() - transferAmount;
        if(updatedSenderWallet < 0){
            log.error("Balance less than transfer amount");
            return new ResponseEntity<String>("Balance less than transfer amount", HttpStatus.NOT_ACCEPTABLE);
        }
        double updatedReceiverWallet = receiverWallet.get().getTotalBalance() + transferAmount;
        senderWallet.get().setTotalBalance(updatedSenderWallet);
        walletRepository.save(senderWallet.get());
        receiverWallet.get().setTotalBalance(updatedReceiverWallet);
        walletRepository.save(receiverWallet.get());
        transactionService.addTransaction(username,transferAmountDTO.getUsername(),transferAmountDTO.getTransferAmount());
        log.info("Transfer Sucess");
        return new ResponseEntity<Wallet>(senderWallet.get(), HttpStatus.OK);

    }
}

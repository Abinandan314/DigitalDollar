package com.example.walletapp.services;

import com.example.walletapp.controllers.WalletController;
import com.example.walletapp.models.Cashback;
import com.example.walletapp.models.User;
import com.example.walletapp.models.Wallet;
import com.example.walletapp.repositories.CashbackRepository;
import com.example.walletapp.repositories.WalletRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Random;
@Slf4j
@Service
public class CashbackService {
    @Autowired
    private CashbackRepository cashbackRepository;
    @Autowired
    private WalletRepository walletRepository;

    public void createCashback(String username){
        double cashbackAmount;
        Cashback cashback = new Cashback();
        List<Double> cashbacks = Arrays.asList(2.0,1.0,10.0,9.0,3.0);
        Random random = new Random();
        int index = random.nextInt(cashbacks.size());
        cashbackAmount = cashbacks.get(index);
        if(cashbackAmount == 0) return;
        cashback.setCashbackAmount(cashbackAmount);
        cashback.setUsername(username);
        cashbackRepository.save(cashback);
    }
    public ResponseEntity<?> claimCashback(String id){
        Optional<Cashback> cashbackOptional = cashbackRepository.findById(id);
        if(!cashbackOptional.isPresent()){
            log.error("Cashback Not Found");
            return new ResponseEntity<>("Cashback Not Found", HttpStatus.NOT_FOUND);
        }
        Optional<Wallet> userWallet = walletRepository.findByUsername(cashbackOptional.get().getUsername());
        double updatedWalletBalance = userWallet.get().getTotalBalance() + cashbackOptional.get().getCashbackAmount();
        userWallet.get().setTotalBalance(updatedWalletBalance);
        walletRepository.save(userWallet.get());
        cashbackRepository.delete(cashbackOptional.get());
        log.info("Cashback claimed Successfully");
        return new ResponseEntity<>("Successful",HttpStatus.OK);
    }
}

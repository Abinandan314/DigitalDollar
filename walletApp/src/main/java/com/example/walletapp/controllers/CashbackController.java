package com.example.walletapp.controllers;

import com.example.walletapp.models.Cashback;
import com.example.walletapp.repositories.CashbackRepository;
import com.example.walletapp.services.CashbackService;
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
@RequestMapping("/cashbacks")
public class CashbackController {
    @Autowired
    private CashbackService cashbackService;
    @Autowired
    private CashbackRepository cashbackRepository;
    @GetMapping("/{username}")
    public ResponseEntity<?> getAllUserCashbacks(@PathVariable(name = "username") String username){
        List<Cashback> cashbackList = cashbackRepository.findAllByUsername(username).stream().flatMap(Optional::stream).collect(Collectors.toList());
        if(cashbackList.size() == 0){
            return new ResponseEntity<>("No Cashbacks Found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Cashback>>(cashbackList,HttpStatus.OK);
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> claimCashback(@PathVariable(name = "id")String id){
        return cashbackService.claimCashback(id);
    }

}

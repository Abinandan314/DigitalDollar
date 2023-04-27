package com.example.walletapp.repositories;

import com.example.walletapp.models.User;
import com.example.walletapp.models.Wallet;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface WalletRepository extends MongoRepository<Wallet,String> {
    Optional<Wallet> findByUsername(String username);
    void deleteByUser(User user);
}

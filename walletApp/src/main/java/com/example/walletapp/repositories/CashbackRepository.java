package com.example.walletapp.repositories;

import com.example.walletapp.models.Cashback;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CashbackRepository extends MongoRepository<Cashback,String> {
    List<Optional<Cashback>> findAllByUsername(String username);
}

package com.example.walletapp.utils;

import com.example.walletapp.models.User;
import jakarta.servlet.http.Cookie;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserSessionDTO {
    private User user;
    private String token;
}

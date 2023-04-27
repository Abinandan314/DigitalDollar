package com.example.walletapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender emailSender;
    public void sendEmail(String toEmail,double transferAmount) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("no-reply@ewallet.ai");
        message.setTo(toEmail);
        message.setSubject("Amount Credited");
        message.setText("$ " + transferAmount + " credited to your wallet");
        emailSender.send(message);
    }


}

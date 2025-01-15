package com.dylan.Booking.controller;

import com.dylan.Booking.dto.LoginRequestDTO;
import com.dylan.Booking.dto.Response;
import com.dylan.Booking.model.User;
import com.dylan.Booking.service.interfac.IUserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final IUserService iUserService;

    public AuthController(IUserService iUserService){
        this.iUserService = iUserService;
    }

    @PostMapping("/register")
    public ResponseEntity<Response> register(@RequestBody @Valid User user){
        Response response = iUserService.register(user);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody @Valid LoginRequestDTO loginRequest){
        Response response = iUserService.login(loginRequest.getEmail(), loginRequest.getPassword());
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}

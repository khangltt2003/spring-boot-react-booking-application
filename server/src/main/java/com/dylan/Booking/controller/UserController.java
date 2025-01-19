package com.dylan.Booking.controller;

import com.dylan.Booking.dto.Response;
import com.dylan.Booking.service.impl.BookingService;
import com.dylan.Booking.service.interfac.IUserService;
import com.dylan.Booking.utils.LoggerUtil;
import org.slf4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    private final IUserService iUserService;
    private final Logger LOGGER = LoggerUtil.getLogger(BookingService.class);


    public UserController(IUserService iUserService) {
        this.iUserService = iUserService;
    }

    @GetMapping("")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'admin')")
    public ResponseEntity<Response> getAllUsers() {
        Response response = iUserService.getAllUsers();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Response> getUserById(@PathVariable String userId) {
        Response response = iUserService.getUserById(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'admin')")
    public ResponseEntity<Response> deleteUserById(@PathVariable String userId) {
        Response response = iUserService.deleteUser(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/get-current-user")
    public ResponseEntity<Response> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Response response = iUserService.getUserByEmail(email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/get-user-booking/{userId}")
    public ResponseEntity<Response> getUserBookings(@PathVariable String userId) {
        Response response = iUserService.getUserBookings(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}


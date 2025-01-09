package com.dylan.Booking.controller;


import com.dylan.Booking.dto.Response;
import com.dylan.Booking.service.interfac.IUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    private final IUserService iUserService;

    public UserController(IUserService iUserService){
        this.iUserService = iUserService;
    }

    @GetMapping("")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response>getAllUsers(){
        Response response = iUserService.getAllUsers();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Response> getUserById(@PathVariable String userId){
        Response response = iUserService.getUserById(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteUserById(@PathVariable String userId){
        Response response = iUserService.deleteUser(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/get-user-by-email/{email}")
    public ResponseEntity<Response> getUserByEmail(@PathVariable String email){
        Response response = iUserService.getUserByEmail(email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/get-user-booking/{userId}")
    public ResponseEntity<Response> getUserBookings(@PathVariable String userId){
        Response response = iUserService.getUserBookings(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}


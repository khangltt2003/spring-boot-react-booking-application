package com.dylan.Booking.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginRequestDTO {

    @NotBlank(message = "email cannot be blank")
    @NotNull(message = "email is required")
    private String email;
    
    @NotNull(message = "password is required")
    @NotBlank(message = "password cannot be blank")
    private String password;
}

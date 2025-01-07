package com.dylan.Booking.dto;

import com.dylan.Booking.model.Booking;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {
    private String id;
    private String name;
    private String email;
    private String phoneNumber;
    private String role;
    private List<BookingDTO> bookings;

}
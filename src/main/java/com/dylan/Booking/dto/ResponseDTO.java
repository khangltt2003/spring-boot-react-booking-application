package com.dylan.Booking.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseDTO {
    private int statusCode;
    private String message;
    private String role;
    private String token;
    private String expirationTime;
    private String confirmationCode;

    private UserDTO user;
    private RoomDTO room;
    private List<UserDTO> users;
    private List<BookingDTO> bookings;
    private List<RoomDTO> rooms;
}

package com.dylan.Booking.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class BookingDTO {
    private String id;
    private LocalDateTime checkInTime;
    private LocalDateTime checkOutTime;
    private String confirmationCode;
    private int numAdults;
    private int numChildren;
    private UserDTO user;
    private RoomDTO room;
}

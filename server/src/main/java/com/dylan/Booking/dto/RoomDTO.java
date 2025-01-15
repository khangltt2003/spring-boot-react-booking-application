package com.dylan.Booking.dto;

import com.dylan.Booking.enums.RoomType;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class RoomDTO {
    private String id;
    private RoomType type;
    private BigDecimal price;

    private String imageUrl;
    private String description;
    private List<BookingDTO> booking;

}

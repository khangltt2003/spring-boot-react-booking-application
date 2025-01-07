package com.dylan.Booking.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotNull
    private LocalDateTime checkInTime;

    @NotNull
    @Future
    private LocalDateTime checkOutTime;

    @Min(value = 1)
    private int numAdults;

    @Min(value = 0)
    private int numChildren;

    private String confirmationCode;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    public int getTotalGuest(){
        return this.numAdults + this.numChildren;
    }

    public void setNumAdults(int numAdults){
        this.numAdults = numAdults;
    }

    public void setNumChildren(int numChildren){
        this.numChildren = numChildren;
    }

    @Override
    public String toString (){
                return "Booking{" +
                "id=" + id +
                ", checkInTime=" + checkInTime +
                ", checkOutTime=" + checkOutTime +
                ", numAdults=" + numAdults +
                ", numChildren=" + numChildren +
                ", totalGuests=" + getTotalGuest() +
                ", confirmationCode='" + confirmationCode + '\'' +
                '}';
    }
}
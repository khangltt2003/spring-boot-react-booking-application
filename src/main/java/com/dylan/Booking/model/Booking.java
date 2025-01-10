package com.dylan.Booking.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotNull(message = "check in time is required.")
    private LocalDateTime checkInTime;

    @NotNull(message = "check out time is required.")
    @Future(message = "check out time must be after check in time.")
    private LocalDateTime checkOutTime;

    @NotNull(message = "number of adult is required.")
    @Min(value = 1, message = "minimum number of adults is 1.")
    private int numAdults;

    @NotNull(message = "number of children is required.")
    @Min(value = 0, message = "minimum number of children is 0.")
    private int numChildren;

    private String confirmationCode;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private  LocalDateTime updatedAt;

    public int getTotalGuest(){
        return this.numAdults + this.numChildren;
    }
}
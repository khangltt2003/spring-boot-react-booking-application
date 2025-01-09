package com.dylan.Booking.repository;

import com.dylan.Booking.model.Booking;
import com.dylan.Booking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface BookingRepository extends JpaRepository<Booking, String> {
    @Query("select bk from Booking as bk where bk.room.id = :roomId")
    List<Booking> findByRoomId(String roomId);

    @Query("select bk from Booking  as bk where bk.user.id = :userId")
    List<Booking> findByUserId(String userId);

    Optional<Booking> findByConfirmationCode(String confirmationCode);
}

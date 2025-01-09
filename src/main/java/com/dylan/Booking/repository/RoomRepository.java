package com.dylan.Booking.repository;

import com.dylan.Booking.enums.RoomType;
import com.dylan.Booking.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, String> {
    boolean existsById(String id);

    Optional<Room> findById(String id);

    List<Room> findByType(RoomType type);

    @Query("select r from Room as r " +
            "where r.id not in " +
            "(select b.room.id from Booking as b )")
    List<Room> getAvailableRooms();


    @Query("select r from Room as r where r.type = :type")
    List<Room> findAvailableRoomsByType(RoomType type);


    @Query("select r from Room  as r where r.id not in (select bk.room.id from Booking as bk " +
            "where (:checkInTime >= bk.checkInTime and  :checkInTime <= bk.checkOutTime) " +
            "or (:checkOutTime >= bk.checkInTime and :checkOutTime <= bk.checkOutTime)" +
            "or (:checkInTime <= bk.checkInTime and :checkOutTiem >= bk.checkOutTime))")
    List<Room> findAvailableRoomsByTime(LocalDateTime checkInTime, LocalDateTime checkOutTime);


    @Query("select r from Room as r " +
            "where r.type  = :type " +
            "and r.id not in (select bk.room.id from Booking as bk " +
            "where (:checkInTime >= bk.checkInTime and :checkInTime <= bk.checkOutTime ) " +
            "or (:checkOutTime >= bk.checkInTime and :checkOutTime <= bk.checkOutTime)" +
            "or (:checkInTime <= bk.checkInTime and :checkOutTiem >= bk.checkOutTime))")
    List<Room> findAvailableRoomsByDatesAndTypes(RoomType type, LocalDateTime checkInTime, LocalDateTime checkOutTime);

}

package com.dylan.Booking.service.interfac;

import com.dylan.Booking.dto.Response;
import com.dylan.Booking.enums.RoomType;
import com.dylan.Booking.model.Room;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface IRoomService {
    Response createRoom(MultipartFile photo, RoomType type, BigDecimal price, String description);

    Response getRoomById(String roomId);
    Response getAllRooms();
    Response getAllAvailableRooms();
    Response getAvailableRoomsByDateAndType(LocalDateTime checkInTime, LocalDateTime checkOutTime, RoomType type);


    Response updateRoom(String roomId, MultipartFile photo, RoomType type, BigDecimal price, String description);

    Response removeRoom(String roomId);

}

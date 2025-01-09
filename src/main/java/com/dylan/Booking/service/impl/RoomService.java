package com.dylan.Booking.service.impl;

import com.dylan.Booking.dto.Response;
import com.dylan.Booking.dto.RoomDTO;
import com.dylan.Booking.enums.RoomType;
import com.dylan.Booking.exceptions.MyException;
import com.dylan.Booking.model.Room;
import com.dylan.Booking.repository.RoomRepository;
import com.dylan.Booking.service.AwsS3Service;
import com.dylan.Booking.service.interfac.IRoomService;
import com.dylan.Booking.utils.Utils;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class RoomService implements IRoomService {

    private final RoomRepository roomRepository;
    private final AwsS3Service awsS3Service;


    public RoomService(RoomRepository roomRepository, AwsS3Service awsS3Service) {
        this.roomRepository = roomRepository;
        this.awsS3Service = awsS3Service;
    }

    @Override
    public Response createRoom(MultipartFile photo, RoomType type, BigDecimal price, String description) {
        Response response = new Response();
        try {
            String imageUrl = awsS3Service.uploadImageToS3(photo);
            Room newRoom = new Room();
            newRoom.setImageUrl(imageUrl);
            newRoom.setType(type);
            newRoom.setDescription(description);
            newRoom.setPrice(price);
            Room savedRoom = roomRepository.save(newRoom);
            RoomDTO savedRoomDTO = Utils.mapRoomEntityToRoomDTO(savedRoom);
            response.setMessage("success");
            response.setStatusCode(201);
            response.setRoom(savedRoomDTO);
        }
        catch (Exception e){
            response.setMessage("internal server error " + e.getMessage());
            response.setStatusCode(500);
        }
        return response;
    }

    @Override
    public Response getRoomById(String roomId) {
        Response response = new Response();
        try {
            Room room = roomRepository.findById(roomId).orElseThrow(()-> new MyException("cannot find room " + roomId));
            RoomDTO roomDTO = Utils.mapRoomEntityToRoomDTO(room);
            response.setMessage("success");
            response.setStatusCode(200);
            response.setRoom(roomDTO);
        }
        catch (MyException e){
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }
        catch (Exception e){
            response.setMessage("internal server error " + e.getMessage());
            response.setStatusCode(500);
        }
        return response;
    }

    @Override
    public Response getAllRooms() {
        Response response = new Response();
        try {
            List<Room> rooms = roomRepository.findAll();
            List<RoomDTO> roomDTOList  = Utils.mapRoomListEntityToRoomListDTO(rooms);
            response.setMessage("success");
            response.setStatusCode(200);
            response.setRooms(roomDTOList);
        }
        catch (Exception e){
            response.setMessage("internal server error " + e.getMessage());
            response.setStatusCode(500);
        }
        return response;
    }

    @Override
    public Response getAllAvailableRooms() {
        Response response = new Response();
        try {
            List<Room> availableRooms = roomRepository.getAvailableRooms();
            List<RoomDTO> availableRoomsDTO = Utils.mapRoomListEntityToRoomListDTO(availableRooms);
            response.setMessage("success");
            response.setStatusCode(200);
            response.setRooms(availableRoomsDTO);
        }
        catch (Exception e){
            response.setMessage("internal server error " + e.getMessage());
            response.setStatusCode(500);
        }
        return response;
    }

    @Override
    public Response getAvailableRoomsByDateAndType(LocalDateTime checkInTime, LocalDateTime checkOutTime, RoomType type) {
        Response response = new Response();
        try {
            List<Room> availableRooms = roomRepository.findAvailableRoomsByDatesAndTypes(type, checkInTime, checkOutTime);
            List<RoomDTO> availableRoomsDTO = Utils.mapRoomListEntityToRoomListDTO(availableRooms);
            response.setMessage("success");
            response.setStatusCode(200);
            response.setRooms(availableRoomsDTO);
        }
        catch (Exception e){
            response.setMessage("internal server error " + e.getMessage());
            response.setStatusCode(500);
        }
        return response;
    }

    @Override
    public Response updateRoom(String roomId, MultipartFile photo, RoomType type, BigDecimal price, String description) {
        Response response = new Response();
        try {
            Room room = roomRepository.findById(roomId).orElseThrow(()-> new MyException("cannot find room "+ roomId));

            if(!photo.isEmpty() || photo != null){
                String imageUrl = awsS3Service.uploadImageToS3(photo);
                room.setImageUrl(imageUrl);
            }

            if(type != null) room.setType(type);
            if(price != null)room.setPrice(price);
            if(description != null) room.setDescription(description);

            Room savedRoom = roomRepository.save(room);
            RoomDTO savedRoomDTO = Utils.mapRoomEntityToRoomDTO(savedRoom);
            response.setMessage("success");
            response.setStatusCode(201);
            response.setRoom(savedRoomDTO);
        }
        catch (MyException e){
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }
        catch (Exception e){
            response.setMessage("internal server error " + e.getMessage());
            response.setStatusCode(500);
        }
        return response;
    }

    @Override
    public Response removeRoom(String roomId) {
        Response response = new Response();
        try {
            if(!roomRepository.existsById(roomId)){
                throw new MyException("cannot find room " + roomId);
            }
            roomRepository.deleteById(roomId);
            response.setMessage("success");
            response.setStatusCode(204);
        }
        catch (MyException e){
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }
        catch (Exception e){
            response.setMessage("internal server error " + e.getMessage());
            response.setStatusCode(500);
        }
        return response;
    }
}

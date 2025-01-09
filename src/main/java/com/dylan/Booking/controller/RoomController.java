package com.dylan.Booking.controller;


import com.dylan.Booking.dto.Response;
import com.dylan.Booking.enums.RoomType;
import com.dylan.Booking.service.interfac.IRoomService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DecimalStyle;

@RestController
@RequestMapping("/rooms")
public class RoomController {
    private final IRoomService iRoomService;

    public RoomController(IRoomService iRoomService) {
        this.iRoomService = iRoomService;
    }

    @PostMapping("")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> createRoom(
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("type") RoomType type,
            @RequestParam("price") BigDecimal price,
            @RequestParam("description") String description
    ) {

        if (photo == null || photo.isEmpty() || type == null  || price == null || description.isBlank() || description == null ) {
            Response response = new Response();
            response.setStatusCode(400);
            response.setMessage("missing photo, type, price, or description");
            return ResponseEntity.status(response.getStatusCode()).body(response);
        }
        Response response = iRoomService.createRoom(photo, type, price, description);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("")
    public ResponseEntity<Response> getAllRooms(){
        Response response = iRoomService.getAllRooms();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<Response> getRoomById(@PathVariable String roomId){
        Response response = iRoomService.getRoomById(roomId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/available")
    public ResponseEntity<Response> getAvailableRooms(@PathVariable String roomId){
        Response response = iRoomService.getAllAvailableRooms();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/available")
    public ResponseEntity<Response> getAvailableRoomsByDateAndType(
            @RequestParam(name = "checkInTime", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime checkInTime,
            @RequestParam(name = "checkOutTime", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime checkOutTime,
            @RequestParam(name = "type", required = false) RoomType type
    ){
        Response response = iRoomService.getAvailableRoomsByDateAndType(checkInTime, checkOutTime, type);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/{roomId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> updateRoom(
            @PathVariable String roomId,
            @RequestParam(name = "photo",required = false) MultipartFile photo,
            @RequestParam(name = "price", required = false) BigDecimal price,
            @RequestParam(name = "type",  required = false) RoomType  type,
            @RequestParam(name = "description", required = false) String description
    ){
        Response response = iRoomService.updateRoom(roomId, photo, type, price, description);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }


    @DeleteMapping("/{roomId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> removeRoom(@PathVariable String roomId){
        Response response = iRoomService.removeRoom(roomId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}

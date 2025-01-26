package com.dylan.Booking.controller;

import com.dylan.Booking.dto.BookingDTO;
import com.dylan.Booking.dto.Response;
import com.dylan.Booking.model.Booking;
import com.dylan.Booking.service.interfac.IBookingService;
import org.hibernate.sql.results.internal.ResolvedSqlSelection;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.webauthn.api.PublicKeyCose;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookings")
public class BookingController {
    private final IBookingService iBookingService;

    public BookingController(IBookingService iBookingService) {
        this.iBookingService = iBookingService;
    }

    @PostMapping("")
    public ResponseEntity<Response> createBooking(@RequestParam("userId") String userId,
                                                  @RequestParam("roomId") String roomId,
                                                  @RequestBody Booking bookingRequest) {
        Response response = iBookingService.createBooking(bookingRequest, userId, roomId);
        return ResponseEntity.status(response.getStatusCode()).body(response);

    }

    @GetMapping("")
    public ResponseEntity<Response> getAllBookings() {
        Response response = iBookingService.getAllBookings();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<Response> getBookingById(@PathVariable String bookingId) {
        Response response = iBookingService.getBookingById(bookingId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/confirmation-code/{code}")
    public ResponseEntity<Response> getBookingByConfirmationCode(@PathVariable String code) {
        Response response = iBookingService.getBookingByConfirmationCode(code);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/userId/{userId}")
    public ResponseEntity<Response> getBookingByUserId(@PathVariable String userId) {
        Response response = iBookingService.getBookingByUserId(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<Response> deleteBookingById(@PathVariable String bookingId) {
        Response response = iBookingService.deleteBooking(bookingId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}

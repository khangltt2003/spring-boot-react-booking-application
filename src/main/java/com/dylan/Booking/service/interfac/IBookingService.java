package com.dylan.Booking.service.interfac;

import com.dylan.Booking.dto.Response;
import com.dylan.Booking.model.Booking;
import com.dylan.Booking.repository.BookingRepository;

public interface IBookingService {
    Response createBooking(Booking bookingRequest, String userId, String roomId );

    Response getBookingById(String booking);
    Response getAllBookings();
    Response getBookingByConfirmationCode(String confirmationCode);
    Response getBookingByUserId(String userId);

    Response deleteBooking(String bookingId);
}

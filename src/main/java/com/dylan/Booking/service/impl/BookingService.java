package com.dylan.Booking.service.impl;

import com.dylan.Booking.dto.BookingDTO;
import com.dylan.Booking.dto.Response;
import com.dylan.Booking.exceptions.MyException;
import com.dylan.Booking.model.Booking;
import com.dylan.Booking.model.Room;
import com.dylan.Booking.model.User;
import com.dylan.Booking.repository.BookingRepository;
import com.dylan.Booking.repository.RoomRepository;
import com.dylan.Booking.repository.UserRepository;
import com.dylan.Booking.service.interfac.IBookingService;
import com.dylan.Booking.utils.Utils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService implements IBookingService {
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;

    public BookingService(UserRepository userRepository, BookingRepository bookingRepository, RoomRepository roomRepository) {
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
    }

    @Override
    public Response createBooking(Booking bookingRequest, String userId, String roomId) {
        Response response = new Response();
        if(bookingRequest.getCheckInTime().isAfter(bookingRequest.getCheckOutTime())){
            throw  new MyException("invalid check out time must be after check in time", 400);
        }
        User user = userRepository.findById(userId).orElseThrow(()-> new MyException("cannot find user " + userId, 404));
        Room room = roomRepository.findById(roomId).orElseThrow(()->new MyException("cannot find room " + roomId, 404));

        List<Booking> existingBookingsForRoom = bookingRepository.findByRoomId(roomId);

        if(!validBooking(existingBookingsForRoom, bookingRequest)){
            throw new MyException("requested time overlaps with existing booking", 400);
        }

        bookingRequest.setUser(user);
        bookingRequest.setRoom(room);
        bookingRequest.setConfirmationCode(Utils.generateRandomConfirmationCode(12));
        Booking savedBooking = bookingRepository.save(bookingRequest);

        BookingDTO savedBookingDTO = Utils.mapBookingEntityToBookingDTOPlusBookedRooms(savedBooking, true);
        response.setBooking(savedBookingDTO);
        response.setMessage("success");
        response.setStatusCode(201);

        return response;
    }

    @Override
    public Response getBookingById(String bookingId) {
        Response response = new Response();
        Booking booking = bookingRepository.findById(bookingId).orElseThrow(()->new MyException("cannot find booking " + bookingId, 404));
        BookingDTO bookingDTO = Utils.mapBookingEntityToBookingDTO(booking);
        response.setStatusCode(200);
        response.setMessage("success");
        response.setBooking(bookingDTO);

        return response;
    }

    @Override
    public Response getBookingByUserId(String userId){
        Response response = new Response();
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        List<BookingDTO> bookingsDTO = Utils.mapBookingListEntityToBookingListDTO(bookings);
        response.setMessage("success");
        response.setStatusCode(200);
        response.setBookings(bookingsDTO);

        return response;
    }

    @Override
    public Response getBookingByConfirmationCode(String confirmationCode) {
        Response response = new Response();
        Booking booking = bookingRepository.findByConfirmationCode(confirmationCode)
                .orElseThrow(()->new MyException("cannot find booking with confirmation code " + confirmationCode, 404));
        BookingDTO bookingDTO = Utils.mapBookingEntityToBookingDTO(booking);
        response.setMessage("success");
        response.setStatusCode(200);
        response.setBooking(bookingDTO);

        return response;
    }

    @Override
    public Response getAllBookings() {
        Response response = new Response();
        List<Booking> bookings = bookingRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
        List<BookingDTO> bookingsDTO = Utils.mapBookingListEntityToBookingListDTO(bookings);
        response.setStatusCode(200);
        response.setMessage("success");
        response.setBookings(bookingsDTO);
        return response;
    }

    @Override
    public Response deleteBooking(String bookingId) {
        Response response = new Response();
        if(!bookingRepository.existsById(bookingId)){
            throw  new MyException("cannot find booking " + bookingId, 400);
        }
        bookingRepository.deleteById(bookingId);
        response.setStatusCode(204);
        response.setMessage("deleted booking " + bookingId );
        return response;
    }

    public boolean validBooking(List<Booking> existingBookingsForRoom, Booking bookingRequest) {
        for (Booking existingBooking : existingBookingsForRoom) {
            if (isOverlapping(existingBooking, bookingRequest)) {
                return false;
            }
        }
        return true;
    }
    private boolean isOverlapping(Booking existingBooking, Booking bookingRequest) {
        return !(bookingRequest.getCheckOutTime().isBefore(existingBooking.getCheckInTime()) ||
                 bookingRequest.getCheckInTime().isAfter(existingBooking.getCheckOutTime()));
    }

}

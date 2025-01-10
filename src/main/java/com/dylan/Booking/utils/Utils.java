package com.dylan.Booking.utils;

import com.dylan.Booking.dto.BookingDTO;
import com.dylan.Booking.dto.RoomDTO;
import com.dylan.Booking.dto.UserDTO;
import com.dylan.Booking.model.Booking;
import com.dylan.Booking.model.Room;
import com.dylan.Booking.model.User;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

public class Utils {

    private static final String ALPHANUMERIC_STRING = "abcdefghijklmnopqrstuvwsyz0123456789";
    private static final SecureRandom secureRandom = new SecureRandom();

    public static String generateRandomConfirmationCode(int length) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(ALPHANUMERIC_STRING.length());
            char randomChar = ALPHANUMERIC_STRING.charAt(randomIndex);
            stringBuilder.append(randomChar);
        }
        return stringBuilder.toString();
    }


    public static UserDTO mapUserEntityToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRole(user.getRole());
        return userDTO;
    }

    public static RoomDTO mapRoomEntityToRoomDTO(Room room) {
        RoomDTO roomDTO = new RoomDTO();
        roomDTO.setId(room.getId());
        roomDTO.setType(room.getType());
        roomDTO.setPrice(room.getPrice());
        roomDTO.setImageUrl(room.getImageUrl());
        roomDTO.setDescription(room.getDescription());
        return roomDTO;
    }

    public static BookingDTO mapBookingEntityToBookingDTO(Booking booking) {
        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setId(booking.getId());
        bookingDTO.setCheckInTime(booking.getCheckInTime());
        bookingDTO.setCheckOutTime(booking.getCheckOutTime());
        bookingDTO.setNumAdults(booking.getNumAdults());
        bookingDTO.setNumChildren(booking.getNumChildren());
        bookingDTO.setConfirmationCode(booking.getConfirmationCode());
        bookingDTO.setRoom(mapRoomEntityToRoomDTO(booking.getRoom()));
        return bookingDTO;
    }

    public static RoomDTO mapRoomEntityToRoomDTOPlusBookings(Room room) {
        RoomDTO roomDTO = new RoomDTO();

        roomDTO.setId(room.getId());
        roomDTO.setType(room.getType());
        roomDTO.setPrice(room.getPrice());
        roomDTO.setImageUrl(room.getImageUrl());
        roomDTO.setDescription(room.getDescription());

        if (room.getBooking() != null) {
            roomDTO.setBooking(room.getBooking().stream().map(Utils::mapBookingEntityToBookingDTO).collect(Collectors.toList()));
        }
        return roomDTO;
    }

    public static BookingDTO mapBookingEntityToBookingDTOPlusBookedRooms(Booking booking, boolean mapUser) {
        BookingDTO bookingDTO = new BookingDTO();

        bookingDTO.setId(booking.getId());
        bookingDTO.setCheckInTime(booking.getCheckInTime());
        bookingDTO.setCheckOutTime(booking.getCheckOutTime());
        bookingDTO.setNumAdults(booking.getNumAdults());
        bookingDTO.setNumChildren(booking.getNumChildren());
        bookingDTO.setConfirmationCode(booking.getConfirmationCode());

        if (mapUser) {
            bookingDTO.setUser(mapUserEntityToUserDTO(booking.getUser()));
        }

        if (booking.getRoom() != null) {
            bookingDTO.setRoom(mapRoomEntityToRoomDTO(booking.getRoom()));
        }
        return bookingDTO;
    }

    public static UserDTO mapUserEntityToUserDTOPlusUserBookingsAndRoom(User user) {
        UserDTO userDTO = new UserDTO();

        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRole(user.getRole());

        if (!user.getBookings().isEmpty()) {
            userDTO.setBookings(user.getBookings().stream().map(booking -> mapBookingEntityToBookingDTOPlusBookedRooms(booking, false)).collect(Collectors.toList()));
        }
        return userDTO;
    }


    public static List<UserDTO> mapUserListEntityToUserListDTO(List<User> userList) {
        return userList.stream().map(Utils::mapUserEntityToUserDTO).collect(Collectors.toList());
    }

    public static List<RoomDTO> mapRoomListEntityToRoomListDTO(List<Room> roomList) {
        return roomList.stream().map(Utils::mapRoomEntityToRoomDTO).collect(Collectors.toList());
    }

    public static List<BookingDTO> mapBookingListEntityToBookingListDTO(List<Booking> bookingList) {
        return bookingList.stream().map(Utils::mapBookingEntityToBookingDTO).collect(Collectors.toList());
    }


}

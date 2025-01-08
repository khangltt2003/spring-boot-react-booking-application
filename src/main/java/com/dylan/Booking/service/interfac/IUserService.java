package com.dylan.Booking.service.interfac;

import com.dylan.Booking.dto.Response;
import com.dylan.Booking.model.User;

public interface IUserService {
    Response register(User user);
    Response login (String email, String password);

    Response getAllUsers ();
    Response getUserByEmail(String email);
    Response getUserById(String id);

    Response getUserBookings(String userId);

    Response deleteUser(String userId);


}

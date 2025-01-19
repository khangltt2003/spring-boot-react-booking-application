package com.dylan.Booking.service.impl;


import com.dylan.Booking.dto.LoginRequestDTO;
import com.dylan.Booking.dto.Response;
import com.dylan.Booking.dto.UserDTO;
import com.dylan.Booking.exceptions.MyException;
import com.dylan.Booking.model.User;
import com.dylan.Booking.repository.BookingRepository;
import com.dylan.Booking.repository.UserRepository;
import com.dylan.Booking.service.interfac.IUserService;
import com.dylan.Booking.utils.JwtService;
import com.dylan.Booking.utils.LoggerUtil;
import com.dylan.Booking.utils.Utils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;

import java.util.List;

@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final Logger LOGGER = LoggerUtil.getLogger(BookingService.class);


    public UserService(UserRepository userRepository, BookingRepository bookingRepository,
                       PasswordEncoder passwordEncoder, JwtService jwtService,
                       AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Response getAllUsers() {
        Response response = new Response();
        List<User> userList = userRepository.findAll();
        List<UserDTO> userDtoList = Utils.mapUserListEntityToUserListDTO(userList);
        response.setUsers(userDtoList);
        response.setStatusCode(200);
        response.setMessage("success");

        return response;
    }

    @Override
    public Response register(User user) {
        Response response = new Response();
        if (user.getRole() == null || user.getRole().isBlank()) {
            user.setRole("USER");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new MyException("email is already used", 400);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        LOGGER.info("registered");

        UserDTO saveUserDTO = Utils.mapUserEntityToUserDTO(savedUser);
        response.setUser(saveUserDTO);
        response.setStatusCode(200);
        response.setMessage("message");


        return response;

    }

    @Override
    public Response login(String email, String password) {
        Response response = new Response();
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

        var user = userRepository.findByEmail(email).orElseThrow(() -> new MyException("cannot find user " + email, 404));

        var token = jwtService.generateToken(user);

        response.setStatusCode(200);
        response.setToken(token);
        response.setUserId(user.getId());
        response.setRole(user.getRole());
        response.setMessage("success");
        return response;
    }

    @Override
    public Response getUserByEmail(String email) {
        Response response = new Response();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new MyException("cannot find user " + email, 404));
        UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);
        response.setUser(userDTO);
        response.setStatusCode(200);
        response.setMessage("success");
        return response;
    }

    @Override
    public Response getUserById(String userId) {
        Response response = new Response();
        User user = userRepository.findById(userId).orElseThrow(() -> new MyException("cannot find user " + userId, 404));
        UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);
        response.setUser(userDTO);
        response.setStatusCode(200);
        response.setMessage("success");
        return response;
    }

    @Override
    public Response getUserBookings(String userId) {
        Response response = new Response();
        User user = userRepository.findById(userId).orElseThrow(() -> new MyException("cannot find user " + userId, 404));
        UserDTO userDTO = Utils.mapUserEntityToUserDTOPlusUserBookingsAndRoom(user);
        response.setMessage("success");
        response.setStatusCode(200);
        response.setUser(userDTO);

        return response;
    }

    @Override
    public Response deleteUser(String userId) {
        Response response = new Response();
        userRepository.findById(userId).orElseThrow(() -> new MyException("cannot find user " + userId, 404));
        userRepository.deleteById(userId);
        response.setStatusCode(200);
        response.setMessage("user with id " + userId + " is deleted");

        return response;

    }
}

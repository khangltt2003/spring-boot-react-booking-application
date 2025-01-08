package com.dylan.Booking.service.impl;


import com.dylan.Booking.dto.Response;
import com.dylan.Booking.dto.UserDTO;
import com.dylan.Booking.exceptions.MyException;
import com.dylan.Booking.model.User;
import com.dylan.Booking.repository.BookingRepository;
import com.dylan.Booking.repository.UserRepository;
import com.dylan.Booking.service.interfac.IUserService;
import com.dylan.Booking.utils.JwtService;
import com.dylan.Booking.utils.Utils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager  authenticationManager;

    public UserService(UserRepository userRepository, BookingRepository bookingRepository,
                       PasswordEncoder passwordEncoder, JwtService jwtService,
                       AuthenticationManager authenticationManager){
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Response getAllUsers (){
        Response response = new Response();
        try {
            List<User> userList = userRepository.findAll();
            List<UserDTO> userDtoList = Utils.mapUserListEntityToUserListDTO(userList);
            response.setUsers(userDtoList);
            response.setStatusCode(200);
            response.setMessage("success");
        } catch (Exception e) {
            response.setStatusCode(400);
            response.setMessage("internal server error" + e.getMessage());
        }
        return response;
    }

    @Override
    public Response register(User user) {
        Response response = new Response();

        try {
            if(user.getRole() == null || user.getRole().isBlank()){
                user.setRole("USER");
            }
            if(userRepository.existsByEmail(user.getEmail())){
                throw new MyException("email is already used");
            }

            user.setPassword(passwordEncoder.encode(user.getPassword()));

            User savedUser = userRepository.save(user);
            UserDTO saveUserDTO = Utils.mapUserEntityToUserDTO(savedUser);
            response.setUser(saveUserDTO);
            response.setStatusCode(200);
            response.setMessage("message");
        }
        catch (MyException e){
            response.setStatusCode(401);
            response.setMessage(e.getMessage());
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("internal server error" + e.getMessage());
        }

        return response;

    }

    @Override
    public Response login(String email, String password) {
        Response response = new Response();

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            var user = userRepository.findByEmail(email).orElseThrow(()->new MyException("cannot find user"));

            var token = jwtService.generateToken(user);
            response.setStatusCode(200);
            response.setToken(token);
            response.setRole(user.getRole());
            response.setExpirationTime("7 days");
            response.setMessage("success");
        }

        catch (MyException e){
            response.setStatusCode(401);
            response.setMessage(e.getMessage());
        }

        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("internal server error" + e.getMessage());
        }

        return response;
    }

    @Override
    public Response getUserByEmail(String email) {
        Response response = new Response();

        try {
            User user = userRepository.findByEmail(email).orElseThrow(()->new MyException("cannot find user"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);
            response.setUser(userDTO);
            response.setStatusCode(200);
            response.setMessage("success");
        }
        catch (MyException e){
            response.setStatusCode(401);
            response.setMessage(e.getMessage());
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("internal server error" + e.getMessage());
        }

        return response;
    }

    @Override
    public Response getUserById(String userId) {
        Response response = new Response();

        try {
            User user = userRepository.findById(userId).orElseThrow(()->new MyException("cannot find user"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);
            response.setUser(userDTO);
            response.setStatusCode(200);
            response.setMessage("success");
        }
        catch (MyException e){
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("internal server error" + e.getMessage());
        }

        return response;
    }

    @Override
    public Response getUserBookings(String userId) {
        Response response = new Response();

        try {
            User user = userRepository.findById(userId).orElseThrow(()-> new MyException("cannot find user"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTOPlusUserBookingsAndRoom(user);
            response.setMessage("success");
            response.setStatusCode(200);
            response.setUser(userDTO);
        }
        catch (MyException e ){
            response.setMessage(e.getMessage());
            response.setStatusCode(401);
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("internal server error" + e.getMessage());
        }

        return response;
    }

    @Override
    public Response deleteUser(String userId) {
        Response response = new Response();
        try {
            userRepository.findById(userId).orElseThrow(()->new MyException("user not found"));
            userRepository.deleteById(userId);
            response.setStatusCode(200);
            response.setMessage("user with id " + userId + " is deleted");
        } catch (MyException e) {
            response.setStatusCode(401);
            response.setMessage("cannot delete user" + userId);
        }
        catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("internal server error" + e.getMessage());
        }

        return response;

    }
}

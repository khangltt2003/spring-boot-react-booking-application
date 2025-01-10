package com.dylan.Booking.utils;

import com.dylan.Booking.dto.Response;
import com.dylan.Booking.exceptions.MyException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Response> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Response response = new Response();
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            String fieldName = error.getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        response.setStatusCode(400);
        response.setErrors(errors);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Response> handleAccessDeniedException(AccessDeniedException ex) {
        Response response = new Response();
        Map<String ,String> error = new HashMap<>();
        error.put("unauthorized", "do not have permission to perform this request");
        response.setStatusCode(401);
        response.setErrors(error);
        return ResponseEntity.status(401).body(response);
    }


    @ExceptionHandler(MyException.class)
        public ResponseEntity<Response> handleMyException(MyException ex) {
        Response response = new Response();
        response.setStatusCode(ex.getStatusCode());
        response.setMessage(ex.getMessage());
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Response> handleException(Exception ex) {
        Response response = new Response();
        response.setStatusCode(500);
        response.setMessage("internal server error " + ex.getMessage());
        return ResponseEntity.status(500).body(response);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<Response> handleAuthenticationException(AuthenticationException ex){
        Response response = new Response();
        response.setStatusCode(401);
        response.setMessage("invalid password or email");
        return ResponseEntity.status(401).body(response);
    }
}
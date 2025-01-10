package com.dylan.Booking.exceptions;

public class MyException extends  RuntimeException{
    private int statusCode;
    public MyException(String message, int statusCode){
        super(message);
        this.statusCode = statusCode;
    }
    public int getStatusCode(){
        return statusCode;
    }
}

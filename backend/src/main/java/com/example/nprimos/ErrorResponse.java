package com.example.nprimos;

import org.springframework.http.HttpStatus;

public class ErrorResponse {
    private final int status;
    private final String error;
    private final String message;

    public ErrorResponse(HttpStatus status, String error, String message) {
        this.status = status.value();
        this.error = error;
        this.message = message;
    }

    // Getters
    public int getStatus() {
        return status;
    }

    public String getError() {
        return error;
    }

    public String getMessage() {
        return message;
    }
}


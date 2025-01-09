package com.dylan.Booking.repository;

import com.dylan.Booking.model.User;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByEmail(String email);
    
    Optional<User> findByEmail(String email);


}

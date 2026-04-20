package com.prueba.umariana.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.prueba.umariana.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
}

package com.prueba.umariana.service;

import java.util.List;
import com.prueba.umariana.model.User;

public interface UserService {
    List<User> getAllUsers();

    User getUserById(Long id);

    User createUser(User user);

    User updateUser(Long id, User user);
    
    void deleteUser(Long id);  
     
}

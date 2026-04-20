package com.prueba.umariana.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.prueba.umariana.model.User;
import com.prueba.umariana.repository.UserRepository;

@Service
public class UserServiceImplement implements UserService {

    private final UserRepository userRepository;

    public UserServiceImplement(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserById(Long id) {
        // Usamos orElseThrow para identificar mejor si el usuario no existe
        return userRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    @Transactional
    public User updateUser(Long id, User userDetails) {
        return userRepository.findById(id).map(existingUser -> {
            existingUser.setName(userDetails.getName());
            existingUser.setEmail(userDetails.getEmail());
            existingUser.setNumber(userDetails.getNumber());
            return userRepository.save(existingUser);
        }).orElse(null); 
        // Si retorna null, el controlador responderá (si lo configuraste)
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        // IMPORTANTE: deleteById lanza una excepción si el ID no existe.
        // Verificamos antes para evitar el Error 500.
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            // Podrías lanzar una excepción personalizada aquí
            System.out.println("El usuario con ID " + id + " no existe.");
        }
    }
}
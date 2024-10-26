package com.frveiculos.frveiculos.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.frveiculos.frveiculos.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Para autenticação de login
    Optional<Usuario> findByEmail(String email);  
}

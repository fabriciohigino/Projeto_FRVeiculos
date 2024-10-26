package com.frveiculos.frveiculos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.frveiculos.frveiculos.model.Veiculos;

public interface VeiculosRepository extends JpaRepository<Veiculos, Long> {
     List<Veiculos> findByCidade(String cidade); 
}

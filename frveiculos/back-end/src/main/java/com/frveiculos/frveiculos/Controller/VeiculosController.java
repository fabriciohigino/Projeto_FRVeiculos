package com.frveiculos.frveiculos.Controller;




import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.frveiculos.frveiculos.Service.VeiculosService;
import com.frveiculos.frveiculos.model.Veiculos;

@RestController
@RequestMapping("/veiculos")
public class VeiculosController {

    @Autowired
    private VeiculosService veiculosService;

    // Cadastrar carro
    @PostMapping
    public ResponseEntity<Veiculos> cadastrarVeiculo(@RequestBody Veiculos veiculo) {
        Veiculos novoVeiculo = veiculosService.cadastrarVeiculo(veiculo);
        return new ResponseEntity<>(novoVeiculo, HttpStatus.CREATED);
    }

    // Listar todos os carros
    @GetMapping
    public ResponseEntity<List<Veiculos>> listarVeiculos() {
        return ResponseEntity.ok(veiculosService.listarVeiculos());
    }

    // Buscar carro por ID
    @GetMapping("/{id}")
    public ResponseEntity<Veiculos> buscarPorId(@PathVariable Long id) {
        Optional<Veiculos> veiculo = veiculosService.buscarPorId(id);
        return veiculo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Atualizar carro
    @PutMapping("/{id}")
    public ResponseEntity<Veiculos> atualizarVeiculo(@PathVariable Long id, @RequestBody Veiculos veiculoAtualizado) {
        Veiculos carro = veiculosService.atualizarVeiculo(id, veiculoAtualizado);
        return ResponseEntity.ok(carro);
    }

    // Deletar carro
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarVeiculo(@PathVariable Long id) {
        veiculosService.deletarVeiculo(id);
        return ResponseEntity.noContent().build();
    }

    // Listar carros por cidade
    @GetMapping("/cidade/{cidade}")
    public ResponseEntity<List<Veiculos>> listarVeiculosPorCidade(@PathVariable String cidade) {
        List<Veiculos> carros = veiculosService.listarVeiculosPorCidade(cidade);
        return ResponseEntity.ok(carros);
    }
}

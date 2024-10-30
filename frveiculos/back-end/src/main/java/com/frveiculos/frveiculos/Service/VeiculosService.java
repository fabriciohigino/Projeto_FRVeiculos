package com.frveiculos.frveiculos.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.frveiculos.frveiculos.model.Veiculos;
import com.frveiculos.frveiculos.repository.VeiculosRepository;
@Service
public class VeiculosService {

    @Autowired
    private VeiculosRepository veiculosRepository;

    // Cadastrar um novo carro
    public Veiculos cadastrarVeiculo(Veiculos carro) {
        return veiculosRepository.save(carro);
    }

    // Listar todos os carros
    public List<Veiculos> listarVeiculos() {
        return veiculosRepository.findAll();
    }

    // Buscar carro por ID
    public Optional<Veiculos> buscarPorId(Long id) {
        return veiculosRepository.findById(id);
    }

    // Atualizar carro
    public Veiculos atualizarVeiculo(Long id, Veiculos veiculoAtualizado) {
        Veiculos veiculo = veiculosRepository.findById(id).orElseThrow(() -> 
            new RuntimeException("Carro não encontrado"));

            veiculo.setNome(veiculoAtualizado.getNome());
            veiculo.setMarca(veiculoAtualizado.getMarca());
            veiculo.setAno(veiculoAtualizado.getAno());
            veiculo.setPlaca(veiculoAtualizado.getPlaca());
            veiculo.setPreco(veiculoAtualizado.getPreco());
            veiculo.setCidade(veiculoAtualizado.getCidade());

        return veiculosRepository.save(veiculo);
    }


    public void deletarVeiculo(Long id) {
        veiculosRepository.deleteById(id);
    }

    /* 
    // Listar carros por cidade
    public List<Veiculos> listarVeiculosPorCidade(String cidade) {
        return veiculosRepository.findByCidade(cidade);
    }*/
}

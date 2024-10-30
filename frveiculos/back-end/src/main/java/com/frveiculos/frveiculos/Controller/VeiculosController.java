package com.frveiculos.frveiculos.Controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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
import java.nio.charset.StandardCharsets;
import com.frveiculos.frveiculos.Service.VeiculosService;
import com.frveiculos.frveiculos.model.Veiculos;
import com.frveiculos.frveiculos.repository.VeiculosRepository;
import org.springframework.http.MediaType;
import java.io.IOException;

@RestController
@RequestMapping("/veiculos")
public class VeiculosController {

    @Autowired
    private VeiculosService veiculosService;
    private VeiculosRepository veiculosRepository;

    // Construtor com injeção de dependência
    public VeiculosController(VeiculosRepository veiculosRepository) {
        this.veiculosRepository = veiculosRepository;
    }

    // Cadastrar veiculos
    @PostMapping
    public ResponseEntity<Veiculos> cadastrarVeiculo(@RequestBody Veiculos veiculo) {
        Veiculos novoVeiculo = veiculosService.cadastrarVeiculo(veiculo);
        return new ResponseEntity<>(novoVeiculo, HttpStatus.CREATED);
    }

    // Listar todos os veiculoss
    @GetMapping
    public ResponseEntity<List<Veiculos>> listarVeiculos() {
        return ResponseEntity.ok(veiculosService.listarVeiculos());
    }

    // Buscar veiculos por ID
    @GetMapping("/{id}")
    public ResponseEntity<Veiculos> buscarPorId(@PathVariable Long id) {
        Optional<Veiculos> veiculo = veiculosService.buscarPorId(id);
        return veiculo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Atualizar veiculos
    @PutMapping("/{id}")
    public ResponseEntity<Veiculos> atualizarVeiculo(@PathVariable Long id, @RequestBody Veiculos veiculoAtualizado) {
        Veiculos veiculos = veiculosService.atualizarVeiculo(id, veiculoAtualizado);
        return ResponseEntity.ok(veiculos);
    }

    // Deletar veiculos
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarVeiculo(@PathVariable Long id) {
        veiculosService.deletarVeiculo(id);
        return ResponseEntity.noContent().build();
    }

    // Listar veiculoss por cidade
   /*  @GetMapping("/cidade/{cidade}")
    public ResponseEntity<List<Veiculos>> listarVeiculosPorCidade(@PathVariable String cidade) {
        List<Veiculos> veiculoss = veiculosService.listarVeiculosPorCidade(cidade);
        return ResponseEntity.ok(veiculoss);
    }*/

@GetMapping("/relatorio")
public ResponseEntity<byte[]> gerarRelatorioveiculoss() throws IOException {
    List<Veiculos> veiculos = veiculosRepository.findAll();

    // estrutura para gera o relatório (CSV simplificado)
    StringBuilder csv = new StringBuilder("ID;Nome;Marca;Ano;Placa;Cidade;Preço\n");
    veiculos.forEach(veiculo -> {
        csv.append(String.format("%d;\"%s\";\"%s\";%d;\"%s\";\"%s\";\"R$ %.2f\"\r\n",
            veiculo.getId(),
            veiculo.getNome(),
            veiculo.getMarca(),
            veiculo.getAno(),
            veiculo.getPlaca(),
            veiculo.getCidade(),
            veiculo.getPreco()
        ));
    });

    byte[] relatorio = csv.toString().getBytes(StandardCharsets.UTF_8);

    // Configura a resposta HTTP para download do arquivo
    HttpHeaders headers = new HttpHeaders();
    headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=relatorio_veiculos.csv");

    return ResponseEntity.ok()
            .headers(headers)
            .contentLength(relatorio.length)
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .body(relatorio);
}


}

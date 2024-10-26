package com.frveiculos.frveiculos.Service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.frveiculos.frveiculos.model.Usuario;
import com.frveiculos.frveiculos.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    
    public Usuario cadastrarUsuario(Usuario usuario) {
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));  // Criptografa senha 
        return usuarioRepository.save(usuario);
    }

    
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    
    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    
    public Usuario atualizarUsuario(Long id, Usuario usuarioAtualizado) {
        Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> 
            new RuntimeException("Usuário não encontrado"));

        usuario.setNome(usuarioAtualizado.getNome());
        usuario.setEmail(usuarioAtualizado.getEmail());
        usuario.setCidade(usuarioAtualizado.getCidade());

        return usuarioRepository.save(usuario);
    }

    
    public void deletarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    
    public void alterarSenha(Long id, String novaSenha) {
        Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> 
            new RuntimeException("Usuário não encontrado"));

        usuario.setSenha(passwordEncoder.encode(novaSenha));
        usuarioRepository.save(usuario);
    }
}

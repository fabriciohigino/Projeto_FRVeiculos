// Função para exibir os dados do usuário logado
document.addEventListener('DOMContentLoaded', () => {
    const dadosUsuario = document.getElementById('dadosUsuario');
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (usuarioLogado) {
        dadosUsuario.innerHTML = `
            <p><strong>Id:</strong> ${usuarioLogado.id}</p>
            <p><strong>Nome:</strong> ${usuarioLogado.nome}</p>
            <p><strong>Email:</strong> ${usuarioLogado.email}</p>
            <p><strong>Cidade:</strong> ${usuarioLogado.cidade}</p>
            <p><strong>Tipo:</strong> ${usuarioLogado.tipo}</p>
            <button id="editarUsuario">Editar Usuário</button>
            <button id="excluirUsuario">Excluir Usuário</button>
            <button id="alterarSenha">Alterar Senha</button>
        `;
    } else {
        dadosUsuario.textContent = 'Nenhum usuário logado.';
    }

    // Editar Usuário
    document.getElementById('editarUsuario').addEventListener('click', () => {
        const novoNome = prompt("Digite o novo nome:", usuarioLogado.nome);
        const novaCidade = prompt("Digite a nova cidade:", usuarioLogado.cidade);
        const novoEmail = prompt("Digite o novo email:", usuarioLogado.email);

        if (novoNome && novaCidade && novoEmail) {
            fetch(`http://localhost:8080/usuarios/${usuarioLogado.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: novoNome,
                    cidade: novaCidade,
                    email: novoEmail,
                    tipo: usuarioLogado.tipo
                }),
            })
                .then(response => {
                    if (response.ok) {
                        alert("Usuário editado com sucesso!");
                        usuarioLogado.nome = novoNome;
                        usuarioLogado.cidade = novaCidade;
                        usuarioLogado.email = novoEmail;
                        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
                        location.reload(); // Recarrega a página
                    } else {
                        alert("Erro ao editar usuário.");
                    }
                })
                .catch(error => console.error('Erro na requisição:', error));
        }
    });

    // Excluir Usuário
    document.getElementById('excluirUsuario').addEventListener('click', () => {
        if (confirm("Tem certeza que deseja excluir seu usuário? Esta ação não pode ser desfeita.")) {
            fetch(`http://localhost:8080/usuarios/${usuarioLogado.id}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        alert("Usuário excluído com sucesso!");
                        localStorage.removeItem('usuarioLogado');
                        window.location.href = 'telalogin.html';
                    } else {
                        alert("Erro ao excluir usuário.");
                    }
                })
                .catch(error => console.error('Erro na requisição:', error));
        }
    });

    // Alterar Senha
    document.getElementById('alterarSenha').addEventListener('click', () => {
        const novaSenha = prompt("Digite a nova senha:");
        if (novaSenha) {
            fetch(`http://localhost:8080/usuarios/${usuarioLogado.id}/alterar-senha?novaSenha=${encodeURIComponent(novaSenha)}`, {
                method: 'PUT',
            })
                .then(response => {
                    if (response.ok) {
                        alert("Senha alterada com sucesso!");
                    } else {
                        alert("Erro ao alterar a senha.");
                    }
                })
                .catch(error => console.error('Erro na requisição:', error));
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const dadosUsuario = document.getElementById('dadosUsuario');
    const qrcodeDiv = document.getElementById('qrcode');
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (usuarioLogado) {
        // Exibe as informações e adiciona os botões sem substituir o conteúdo existente
        dadosUsuario.innerHTML = `
            <p><strong>ID:</strong> ${usuarioLogado.id}</p>
            <p><strong>Nome:</strong> ${usuarioLogado.nome}</p>
            <p><strong>Email:</strong> ${usuarioLogado.email}</p>
            <p><strong>Cidade:</strong> ${usuarioLogado.cidade}</p>
            <p><strong>Tipo:</strong> ${usuarioLogado.tipo}</p>
        `;

        // Adiciona botões de forma separada
        const botoes = `
            <button id="editarUsuario">Editar Usuário</button>
            <button id="excluirUsuario">Excluir Usuário</button>
            <button id="alterarSenha">Alterar Senha</button>
        `;
        dadosUsuario.insertAdjacentHTML('beforeend', botoes);

        // Gera o QR Code automaticamente
        const textoQRCode = `
            ID: ${usuarioLogado.id}
            Nome: ${usuarioLogado.nome}
            Email: ${usuarioLogado.email}
            Cidade: ${usuarioLogado.cidade}
            Tipo: ${usuarioLogado.tipo}
        `;

        qrcodeDiv.innerHTML = ""; // Limpa QR Code antigo, se houver
        new QRCode(qrcodeDiv, {
            text: textoQRCode,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
        });

        // Funções dos botões
        document.getElementById('editarUsuario').addEventListener('click', editarUsuario);
        document.getElementById('excluirUsuario').addEventListener('click', excluirUsuario);
        document.getElementById('alterarSenha').addEventListener('click', alterarSenha);
    } else {
        dadosUsuario.textContent = 'Nenhum usuário logado.';
    }

    // Funções auxiliares para os botões
    function editarUsuario() {
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
    }

    function excluirUsuario() {
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
    }

    function alterarSenha() {
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
    }
});

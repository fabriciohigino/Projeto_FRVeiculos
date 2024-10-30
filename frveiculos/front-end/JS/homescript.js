
// Função para limpar o localStorage e redirecionar para a página de login
//function logout() {
  //  localStorage.removeItem('usuarioLogado');
    //window.location.href = 'index.html';
//}


// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    window.location.href = 'telalogin.html';
});

document.getElementById('exibirUsuario').addEventListener('click', () => {
    window.location.href = 'perfil.html';
});

document.getElementById('listUsersBtn').addEventListener('click', () => {
    window.location.href = 'listarusuarios.html';
});

document.getElementById('listCarsBtn').addEventListener('click', () => {
    window.location.href = 'listarcarro.html';
});

document.getElementById('addUserBtn').addEventListener('click', () => {
    window.location.href = 'cadastra.html';
});

document.getElementById('addCarBtn').addEventListener('click', () => {
    window.location.href = 'cadastrarVeiculo.html';
})


document.getElementById('downloadRelatorio').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:8080/veiculos/relatorio', {
            method: 'GET',
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            // Cria um link para iniciar o download
            const a = document.createElement('a');
            a.href = url;
            a.download = 'relatorio_carros.csv';
            document.body.appendChild(a);
            a.click();

            // Remove o link após o download
            a.remove();
            window.URL.revokeObjectURL(url);
        } else {
            alert('Erro ao baixar relatório.');
        }
    } catch (error) {
        console.error('Erro ao baixar relatório:', error);
        alert('Erro ao conectar com o servidor.');
    }
});

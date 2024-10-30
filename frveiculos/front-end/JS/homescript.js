
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


// Função para gerar QR Code com as informações do veículo
document.getElementById('gerarQRCode').addEventListener('click', async () => {
    const veiculoId = document.getElementById('veiculoId').value;
    const qrcodeDiv = document.getElementById('qrcode');

    if (!veiculoId) {
        alert("Por favor, insira um ID de veículo.");
        return;
    }

    try {
        // Busca as informações do veículo pelo ID
        const response = await fetch(`http://localhost:8080/veiculos/${veiculoId}`);

        if (response.ok) {
            const veiculo = await response.json();
            const veiculoInfo = `
                ID: ${veiculo.id}
                Nome: ${veiculo.nome}
                Marca: ${veiculo.marca}
                Ano: ${veiculo.ano}
                Placa: ${veiculo.placa}      
            `;

            // Limpa o QR Code anterior, se houver
            qrcodeDiv.innerHTML = "";

            // Gera o QR Code com as informações do veículo
            new QRCode(qrcodeDiv, {
                text: veiculoInfo,
                width: 200,
                height: 200,
                colorDark: "#000000",
                colorLight: "#ffffff",
            });
        } else if (response.status === 404) {
            alert("Veículo não encontrado.");
        } else {
            throw new Error("Erro ao buscar o veículo.");
        }
    } catch (error) {
        console.error('Erro:', error);
        alert("Ocorreu um erro ao gerar o QR Code.");
    }
});

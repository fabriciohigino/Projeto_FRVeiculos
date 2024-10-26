// Obtém os parâmetros da URL para pegar o ID do carro
const urlParams = new URLSearchParams(window.location.search);
const carId = urlParams.get('id');

// Preenche o formulário com os dados do carro
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch(`http://localhost:8080/veiculos/${carId}`);
        const car = await response.json();

        document.getElementById('carId').value = car.id;
        document.getElementById('carNome').value = car.nome;
        document.getElementById('carBrand').value = car.marca;
        document.getElementById('carAno').value = car.ano;
        document.getElementById('carPlaca').value = car.placa;
        document.getElementById('carPreco').value = car.preco;
    } catch (error) {
        console.error('Erro ao carregar carro:', error);
    }
});

// Salva as alterações
document.getElementById('editCarForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('carId').value;
    const nome = document.getElementById('carNome').value;
    const ano = document.getElementById('carAno').value;
    const placa = document.getElementById('carPlaca').value;
    const preco = document.getElementById('carPreco').value;

    try {
        const response = await fetch(`http://localhost:8080/veiculos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, marca, ano, placa, preco }),
        });

        if (response.ok) {
            alert('Carro atualizado com sucesso!');
            window.location.href = 'listCars.html';
        } else {
            alert('Erro ao atualizar carro.');
        }
    } catch (error) {
        console.error('Erro ao salvar alterações:', error);
    }
});

// Cancela e volta para a lista de carros
document.getElementById('cancelBtn').addEventListener('click', () => {
    window.location.href = 'listarcarro.html';
});

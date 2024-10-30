document.addEventListener("DOMContentLoaded", async () => {
    const tableBody = document.querySelector("#carsTable tbody");

    try {
        const response = await fetch('http://localhost:8080/veiculos'); 
        const cars = await response.json();

        cars.forEach(car => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${car.id}</td>
                <td>${car.nome}</td>
                <td>${car.marca}</td>
                <td>${car.ano}</td>
                <td>${car.placa}</td>
                 <td>${formatCurrency(car.preco)}</td>
                <td>
                    <button onclick="editCar(${car.id})">Editar</button>
                    <button onclick="deleteCar(${car.id})">Excluir</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar carros:', error);
    }

    document.getElementById('backBtn').addEventListener('click', () => {
        window.location.href = 'home.html'; // Volta para a página Home
    });
});

// formatar o preço "R$"
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function editCar(id) {
    window.location.href = `editarcarro.html?id=${id}`;
}

async function deleteCar(id) {
    const confirmDelete = confirm(`Tem certeza que deseja excluir o carro com ID ${id}?`);
    if (!confirmDelete) return;

    try {
        const response = await fetch(`http://localhost:8080/veiculos/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Carro excluído com sucesso!');
            // Remove a linha da tabela após a exclusão
            document.querySelector(`#car-${id}`).remove();
        } else {
            alert('Erro ao excluir carro.');
        }
    } catch (error) {
        console.error('Erro ao excluir carro:', error);
    }
    window.location.reload();
}


// Função para buscar um veículo por ID
document.getElementById('buscarVeiculo').addEventListener('click', async () => {
    const veiculoId = document.getElementById('veiculoId').value;
    const resultadoBusca = document.getElementById('resultadoBusca');

    if (!veiculoId) {
        alert("Por favor, digite um ID.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/veiculos/${veiculoId}`);

        if (response.ok) {
            const veiculo = await response.json();
            resultadoBusca.innerHTML = `
                <h3>Veículo Encontrado:</h3>
                <p><strong>ID:</strong> ${veiculo.id}</p>
                <p><strong>Nome:</strong> ${veiculo.nome}</p>
                <p><strong>Marca:</strong> ${veiculo.marca}</p>
                <p><strong>Ano:</strong> ${veiculo.ano}</p>
                <p><strong>Placa:</strong> ${veiculo.placa}</p>
                <p><strong>Preço:</strong> R$${veiculo.preco}</p>
                <p><strong>Cidade:</strong> ${veiculo.cidade}</p>
            `;
        } else if (response.status === 404) {
            resultadoBusca.innerHTML = `<p>Veículo não encontrado.</p>`;
        } else {
            throw new Error("Erro ao buscar o veículo.");
        }
    } catch (error) {
        console.error('Erro:', error);
        resultadoBusca.innerHTML = `<p>Ocorreu um erro ao buscar o veículo.</p>`;
    }
});

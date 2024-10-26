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

// formatar o preço como "R$"
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function editCar(id) {
    window.location.href = `editarcarro.html?id=${id}`;
}

function deleteCar(id) {
    alert(`Função de exclusão para o carro ${id} (a implementar)`);
}

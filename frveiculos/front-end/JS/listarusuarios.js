document.addEventListener("DOMContentLoaded", async () => {
    const tableBody = document.querySelector("#usersTable tbody");

    try {
        const response = await fetch('http://localhost:8080/usuarios/listar'); // Verifique se essa URL está correta
        if (!response.ok) {
            throw new Error('Erro na resposta da API');
        }
        const users = await response.json();

        // Verifique se os usuários foram recebidos
        if (users.length === 0) {
            const row = document.createElement("tr");
            row.innerHTML = `<td colspan="4">Nenhum usuário encontrado</td>`;
            tableBody.appendChild(row);
        } else {
            users.forEach(user => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.nome}</td>
                    <td>${user.email}</td>
                    <td>${user.cidade}</td>
                    <td>${user.tipo}</td>
                    <td>
                        <button onclick="editUser(${user.id})">Editar</button>
                        <button onclick="deleteUser(${user.id})">Excluir</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="4">Erro ao buscar usuários</td>`;
        tableBody.appendChild(row);
    }

    document.getElementById('backBtn').addEventListener('click', () => {
        window.location.href = 'home.html'; // Volta para a página Home
    });
});

// Funções para editar e excluir usuários (ainda a implementar)
function editUser(id) {
    window.location.href = `editarusuario.html?id=${id}`;
}

function deleteUser(id) {
    alert(`Função de exclusão para o usuário ${id} (a implementar)`);
}

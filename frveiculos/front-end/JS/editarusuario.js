// Obtém os parâmetros da URL para pegar o ID do usuário
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

// Preenche o formulário com os dados do usuário
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch(`http://localhost:8080/usuarios/${userId}`);
        const user = await response.json();

        document.getElementById('userId').value = user.id;
        document.getElementById('userName').value = user.nome;
        document.getElementById('userEmail').value = user.email;
        document.getElementById('userCidade').value = user.cidade;
    } catch (error) {
        console.error('Erro ao carregar usuário:', error);
    }
});

// Salva as alterações
document.getElementById('editUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('userId').value;
    const nome = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const cidade = document.getElementById('userCidade').value;

    try {
        const response = await fetch(`http://localhost:8080/usuarios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, email, cidade }),
        });

        if (response.ok) {
            alert('Usuário atualizado com sucesso!');
            window.location.href = 'listarusuarios.html';
        } else {
            alert('Erro ao atualizar usuário.');
        }
    } catch (error) {
        console.error('Erro ao salvar alterações:', error);
    }
});

// Cancela e volta para a lista de usuários
document.getElementById('cancelBtn').addEventListener('click', () => {
    window.location.href = 'listarusuarios.html';
});

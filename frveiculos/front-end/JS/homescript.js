// Simulando dados do usuário (substitua por dados reais se necessário)
const user = {
    name: "Nome do Usuário", // Obtenha o nome real do usuário após login
};

// Exibir o nome do usuário
document.getElementById('userName').textContent = user.name;

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    window.location.href = 'telalogin.html';
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
});

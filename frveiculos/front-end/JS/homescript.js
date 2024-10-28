
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
});

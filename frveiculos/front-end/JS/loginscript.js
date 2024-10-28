const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o reload da página

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const tipo = document.getElementById("tipo").value; 

    try {
        const response = await fetch('http://localhost:8080/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha, tipo }),
        });

        if (response.ok) {
            // Decodifica a resposta para obter os dados do usuário
            const userData = await response.json();

            // Redireciona com base no tipo do usuário
            if (userData.tipo === 'COMUM') {
                window.location.href = 'homeComum.html';
            } else if (userData.tipo === 'ADMIN') {
                window.location.href = 'home.html';
            }
        } else {
            const errorData = await response.text();
            errorMessage.textContent = `Erro: ${errorData}`;
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        errorMessage.textContent = 'Erro ao conectar com o servidor. Verifique o console.';
    }
});
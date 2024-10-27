document.getElementById("userForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita o reload da página

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const tipo = document.getElementById("tipo").value; 
    const cidade = document.getElementById("cidade").value;

    try {
        const response = await fetch('http://localhost:8080/usuarios/criar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha, tipo, cidade }),
        });

        if (!response.ok) {
            const errorData = await response.json(); 
            console.error('Erro na API:', errorData);
            throw new Error(`Erro ${response.status}: ${errorData.message || 'Erro desconhecido'}`);
        }

        const message = "Usuário cadastrado com sucesso!";
        document.getElementById("userMessage").innerText = message;
        document.getElementById("userForm").reset();
    } catch (error) {
        console.error('Erro:', error);
        document.getElementById("userMessage").innerText = "Erro ao cadastrar usuário.";
    }
});

document.getElementById("userForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita o reload da página

    const nome = document.getElementById("nome").value;
    const marca = document.getElementById("marca").value;
    const placa = document.getElementById("placa").value;
    const ano = document.getElementById("ano").value;
    const preco = document.getElementById("preco").value;
    const cidade = document.getElementById("cidade").value;

    try {
        const response = await fetch('http://localhost:8080/veiculos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, marca, placa, ano, preco, cidade }),
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

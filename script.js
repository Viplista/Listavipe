// Função para cadastrar convidado
document.getElementById("form-convidado").addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const contato = document.getElementById("contato").value;

    // Verificar se o nome e contato foram preenchidos
    if (nome && contato) {
        const novoConvidado = { nome, cpf, contato };

        // Recuperar eventos do localStorage ou inicializar um novo array
        let convidados = JSON.parse(localStorage.getItem("convidados")) || [];
        convidados.push(novoConvidado);
        localStorage.setItem("convidados", JSON.stringify(convidados));

        alert("Convidado cadastrado com sucesso!");
        // Limpar o formulário após o envio
        document.getElementById("form-convidado").reset();
    } else {
        alert("Por favor, preencha todos os campos obrigatórios.");
    }
});

// Função para exibir a lista de convidados na página de administração
window.onload = function () {
    const listaConvidados = JSON.parse(localStorage.getItem("convidados")) || [];
    const tbody = document.getElementById("lista-convidados");

    // Preencher a tabela com os dados
    listaConvidados.forEach(convidado => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${convidado.nome}</td>
            <td>${convidado.cpf || "Não informado"}</td>
            <td>${convidado.contato}</td>
        `;
        tbody.appendChild(tr);
    };

    // Função para baixar a lista em Excel
    document.getElementById("baixar-lista").addEventListener("click", function () {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(listaConvidados);
        XLSX.utils.book_append_sheet(wb, ws, "Convidados");

        // Baixar o arquivo Excel
        XLSX.writeFile(wb, "lista_convidados.xlsx");
    });
};

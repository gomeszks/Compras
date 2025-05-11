const form = document.getElementById("form-adicionar");
const nomeInput = document.getElementById("nome");
const listaProdutos = document.getElementById("lista-produtos");
const totalGeral = document.getElementById("total-geral");

let produtos = [];

function atualizarTotalGeral() {
    let total = produtos.reduce((soma, prod) => soma + prod.total, 0);
    totalGeral.textContent = total.toFixed(2);
}

function renderizarProdutos() {
    listaProdutos.innerHTML = "";
    produtos.forEach((produto, index) => {
    const tr = document.createElement("tr");

    const tdNome = document.createElement("td");
    tdNome.textContent = produto.nome;

    const tdValor = document.createElement("td");
    const inputValor = document.createElement("input");
    inputValor.type = "number";
    inputValor.min = "0";
    inputValor.value = produto.valor;
    inputValor.oninput = () => {
        produto.valor = parseFloat(inputValor.value) || 0;
      produto.total = produto.valor * produto.quantidade;
        tdTotal.textContent = produto.total.toFixed(2);
        atualizarTotalGeral();
    };
    tdValor.appendChild(inputValor);

    const tdQtd = document.createElement("td");
    const inputQtd = document.createElement("input");
    inputQtd.type = "number";
    inputQtd.min = "0";
    inputQtd.value = produto.quantidade;
    inputQtd.oninput = () => {
        produto.quantidade = parseFloat(inputQtd.value) || 0;
      produto.total = produto.valor * produto.quantidade;
        tdTotal.textContent = produto.total.toFixed(2);
        atualizarTotalGeral();
    };
    tdQtd.appendChild(inputQtd);

    const tdTotal = document.createElement("td");
    tdTotal.textContent = produto.total.toFixed(2);

    const tdAcoes = document.createElement("td");
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "🗑️";
    btnRemover.onclick = () => {
        produtos.splice(index, 1);
        renderizarProdutos();
        atualizarTotalGeral();
    };
    tdAcoes.appendChild(btnRemover);

    tr.appendChild(tdNome);
    tr.appendChild(tdValor);
    tr.appendChild(tdQtd);
    tr.appendChild(tdTotal);
    tr.appendChild(tdAcoes);

    listaProdutos.appendChild(tr);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = nomeInput.value.trim();
    if (nome) {
    produtos.push({ nome, valor: 0, quantidade: 0, total: 0 });
    nomeInput.value = "";
    renderizarProdutos();
    atualizarTotalGeral();
    }
});

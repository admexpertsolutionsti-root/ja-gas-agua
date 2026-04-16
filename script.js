// ======================
// 📌 Parte 1: Declaração de Variáveis Globais Elementos do DOM
// ======================

const divProdutos = document.getElementById('produtos');
const btnGas = document.getElementById('btn-gas');
const btnAgua = document.getElementById('btn-agua');
const conteudoGas = document.getElementById('conteudo-gas');
const conteudoAgua = document.getElementById('conteudo-agua');
const produtosContainer = document.getElementById('produtos');
const btnCarrinho = document.getElementById('btn-carrinho');
const conteudoCarrinho = document.getElementById('conteudo-carrinho');
const quantidadeItensCard = document.getElementById('quant-items-card');
const modalCarrinho = document.getElementById('modal-carrinho');
const modalPedidos = document.getElementById('modal-pedidos');
const btnFechar = document.getElementById('btn-fechar');
const btnEnviarPedido = document.getElementById('btn-enviarPedido');
const carrinhoItens = document.getElementById('carrinho-itens');
const totalContainer = document.getElementById('valor-total');
const enderecoInput = document.getElementById('endereco');
const avisoEndereco = document.getElementById('aviso-endereco');
const metodoPagamento = document.getElementById('metodo-pagamento');
const quantidadeItens = document.getElementById('items-carrinho');
const btnVejaMais = document.getElementById('btn-vejaMais');

// Array para armazenar os itens do carrinho
let carrinho = [];
let totalCarrinho = 0;

let enderecoSalvo = '';
let pagamentoSalvo = '';

// ======================
// 📌 Parte 2: Horario de Funcionando
// ======================

// Captura o elemento com id "horario-cor"
const horarioCor = document.getElementById('horario-cor');

// Obter o dia da semana e horário atual
const dataAtual = new Date();
const diaSemana = dataAtual.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
const horaAtual = dataAtual.getHours();
const minutosAtual = dataAtual.getMinutes();

// Função para determinar o horário de funcionamento
function atualizarHorario() {
    let mensagem = '';
    let corDeFundo = '';

    if (diaSemana >= 1 && diaSemana <= 6) {
        // Segunda a Sexta (08:00 - 18:00)
        if (horaAtual >= 8 && horaAtual < 18) {
            mensagem = 'Aberto: 08:00 às 18:00';
            corDeFundo = 'bg-green-600';
        } else if (horaAtual < 8) {
            mensagem = 'Fechado. Reabrimos às 08:00';
            corDeFundo = 'bg-red-600';
        } else {
            mensagem = 'Fechado. Reabrimos amanhã às 08:00';
            corDeFundo = 'bg-red-600';
        }
    } else {
        // Domingo
        mensagem = 'Fechado. Reabrimos segunda-feira às 08:00';
        corDeFundo = 'bg-red-600';
    }

    // Atualizar o texto e a cor de fundo do elemento
    horarioCor.innerHTML = `<span class="text-white font-medium">${mensagem}</span>`;
    horarioCor.className = `px-4 py-1 rounded-lg mt-2 ${corDeFundo}`;
}

// Chamar a função ao carregar a página
atualizarHorario();

// ======================
// 📌 Parte 3: Função no menu para abrir itens Gás e Água
// ======================

// Produtos disponíveis (Gás e Água)
const produtos = {
    gas: [
        { nome: "Botijão 13Kg [Troca]", preco: 130.00 },
        { nome: "Botijão 13Kg [Novo]", preco: 345.00 }
    ],
    agua: [
        { nome: "Galão 20L [Troca]", preco: 14.00 },
        { nome: "Galão 20L [Novo]", preco: 40.00 }
    ],
    carvao: [
        { nome: "Carvão Saco 2kg", preco: 17.00 },
        { nome: "Carvão Saco 4kg", preco: 28.00 }
    ]
};

// Função para exibir produtos dinamicamente
function exibirProdutos(tipo) {
    // Limpa o conteúdo anterior
    divProdutos.innerHTML = '';

    // Adiciona os produtos do tipo selecionado
    produtos[tipo].forEach(produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.className = "bg-white p-3 shadow-md rounded mb-4 w-4/5 md:w-2/5 mx-auto";

        // Nome e preço do produto
        produtoDiv.innerHTML = `
            <h3 class="font-bold text-lg mb-2">${produto.nome}</h3>
            <p class="text-gray-600 mb-3">R$ ${produto.preco.toFixed(2)}</p>
        `;

        // Botão "Adicionar ao Carrinho"
        const botaoAdicionar = document.createElement('button');
        botaoAdicionar.className = "bg-green-500 text-white py-2 px-3 rounded hover:bg-green-600 transition duration-200 w-full text-sm";
        botaoAdicionar.textContent = "Adicionar ao Carrinho";
        botaoAdicionar.onclick = () => adicionarAoCarrinho(produto);

        // Adiciona o botão ao div do produto
        produtoDiv.appendChild(botaoAdicionar);

        // Adiciona o produto à lista
        divProdutos.appendChild(produtoDiv);
    });
}

// Função para alternar visibilidade de acordo com o tipo
let tipoAtualVisivel = null;
function toggleProdutos(tipo) {
    if (tipoAtualVisivel === tipo) {
        // Se clicar no botão do tipo já visível, esconde
        divProdutos.innerHTML = '';
        tipoAtualVisivel = null; // Reseta o estado
    } else {
        // Se clicar em outro botão, exibe os produtos do novo tipo
        exibirProdutos(tipo);
        tipoAtualVisivel = tipo; // Atualiza o estado
    }
}

// Função exemplo para adicionar itens ao carrinho
function adicionarAoCarrinho(produto) {
    alert(`Você adicionou "${produto.nome}" ao carrinho!`);
    // Lógica para atualizar carrinho
}

// Seleção de botões
btnGas.addEventListener('click', () => toggleProdutos('gas'));
btnAgua.addEventListener('click', () => toggleProdutos('agua'));
btnVejaMais.addEventListener('click', () => toggleProdutos('carvao'));

// ======================
// 📌 Parte 4: Adicionar items ao carrinho 
// ======================

// Função para adicionar itens ao carrinho
function adicionarAoCarrinho(produto) {
    // Verifica se o item já existe no carrinho
    const itemExistente = carrinho.find(item => item.nome === produto.nome);

    if (itemExistente) {
        // Se já existe, aumenta a quantidade e atualiza o preço total
        itemExistente.quantidade += 1;
        itemExistente.total = itemExistente.quantidade * itemExistente.preco;
    } else {
        // Caso contrário, adiciona um novo item ao carrinho
        carrinho.push({ ...produto, quantidade: 1, total: produto.preco });
    }

    // Atualiza o total do carrinho
    totalCarrinho = carrinho.reduce((soma, item) => soma + item.total, 0);

    // Atualiza o footer com a quantidade de itens e o valor total
    quantidadeItensCard.textContent = `( ${carrinho.length} )`;
    btnCarrinho.innerHTML = `
        <span id="quant-items-card">( ${carrinho.reduce((soma, item) => soma + item.quantidade, 0)} )</span>
        Ver meu carrinho - Total: R$ ${totalCarrinho.toFixed(2)}
        <i class="fa fa-cart-plus text-lg text-white"></i>
    `;

    // Exibe o modal do carrinho
    abrirModalCarrinho();
}

// Função para exibir o modal do carrinho com os itens
function abrirModalCarrinho() {
    // Limpa o conteúdo anterior do modal
    conteudoCarrinho.innerHTML = '';

    carrinho.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = "flex justify-between items-center border-b pb-2 mb-2";

        let extraCampo = '';

        // Se for o "Galão 20L [Troca]", adiciona um select de ano de fabricação
        if (item.nome === "Galão 20L [Troca]") {
            extraCampo = `
                <label for="fabricacao-${index}" class="block font-bold mt-2">Ano de Fabricação:</label>
                <select id="fabricacao-${index}" class="w-full border-2 border-black rounded p-1 my-1">
                    <option value="" disabled selected>Selecione o ano</option>
                    ${Array.from({ length: 2025 - 2018 + 1 }, (_, i) => `<option value="${2018 + i}">${2018 + i}</option>`).join('')}
                </select>
            `;
        }

        // Nome, quantidade e preço do item + campo extra (se necessário)
        itemDiv.innerHTML = `
            <div class="w-3/4">
                <span class="text-gray-800 font-medium">${item.nome}</span>
                <p class="text-gray-600">R$ ${item.total.toFixed(2)} (x${item.quantidade})</p>
                ${extraCampo}
            </div>
        `;

        // Botões de ajuste de quantidade
        const botaoQuantidade = document.createElement('div');
        botaoQuantidade.className = "flex items-center gap-2";

        const botaoMenos = document.createElement('button');
        botaoMenos.className = "bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition";
        botaoMenos.textContent = "-";
        botaoMenos.onclick = () => alterarQuantidade(index, -1);

        const botaoMais = document.createElement('button');
        botaoMais.className = "bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition";
        botaoMais.textContent = "+";
        botaoMais.onclick = () => alterarQuantidade(index, 1);

        botaoQuantidade.appendChild(botaoMenos);
        botaoQuantidade.appendChild(botaoMais);

        itemDiv.appendChild(botaoQuantidade);
        conteudoCarrinho.appendChild(itemDiv);
    });

    // Total do pedido
    const totalDiv = document.createElement('div');
    totalDiv.className = "mt-4 flex justify-between items-center border-t pt-2";
    totalDiv.innerHTML = `
        <span class="font-bold text-lg">Total:</span>
        <span class="font-bold text-lg text-green-600">R$ ${totalCarrinho.toFixed(2)}</span>
    `;
    conteudoCarrinho.appendChild(totalDiv);

    // Método de pagamento
    const metodoPagamentoDiv = document.createElement('div');
    metodoPagamentoDiv.className = "mt-4";
    metodoPagamentoDiv.innerHTML = `
        <p class="font-bold mt-2">Método de Pagamento:</p>
        <select id="metodo-pagamento" onchange="pagamentoSalvo = this.value" class="w-full border-2 border-black rounded p-1 my-1">
            <option value="" disabled ${!pagamentoSalvo ? 'selected' : ''}>Selecione uma opção</option>
            <option value="PIX" ${pagamentoSalvo === 'PIX' ? 'selected' : ''}>PIX</option>
            <option value="Dinheiro" ${pagamentoSalvo === 'Dinheiro' ? 'selected' : ''}>Dinheiro</option>
            <option value="Cartão" ${pagamentoSalvo === 'Cartão' ? 'selected' : ''}>Cartão</option>
        </select>
    `;
    conteudoCarrinho.appendChild(metodoPagamentoDiv);

    // Campo de endereço
    const enderecoDiv = document.createElement('div');
    enderecoDiv.className = "mt-4";
    enderecoDiv.innerHTML = `
        <label for="input-endereco" class="block text-sm font-bold">Endereço:</label>
        <input type="text" id="input-endereco" value="${enderecoSalvo}" oninput="enderecoSalvo = this.value" class="w-full p-2 border rounded" placeholder="Digite seu endereço">
        <span id="mensagem-erro" class="text-red-500 text-sm mt-1 hidden">Por favor, preencha o endereço.</span>
    `;
    conteudoCarrinho.appendChild(enderecoDiv);

    // Botões do modal
    const botoesDiv = document.createElement('div');
    botoesDiv.className = "mt-4 flex justify-between items-center";
    botoesDiv.innerHTML = `
        <button class="bg-gray-300 text-black py-2 px-4 rounded" onclick="fecharModalCarrinho()">Fechar</button>
        <button class="bg-green-500 text-white py-2 px-4 rounded" onclick="enviarPedido()">Enviar Pedido</button>
    `;
    conteudoCarrinho.appendChild(botoesDiv);

    // Torna o modal visível
    modalCarrinho.classList.remove('hidden');
}

// Função para alterar a quantidade de itens
function alterarQuantidade(index, delta) {
    const item = carrinho[index];
    item.quantidade += delta;

    if (item.quantidade <= 0) {
        // Remove o item do carrinho se a quantidade chegar a 0
        carrinho.splice(index, 1);
    } else {
        // Atualiza o total do item
        item.total = item.quantidade * item.preco;
    }

    // Atualiza o total do carrinho
    totalCarrinho = carrinho.reduce((soma, item) => soma + item.total, 0);

    // Atualiza o footer e o modal
    quantidadeItensCard.textContent = `( ${carrinho.length} )`;
    btnCarrinho.innerHTML = `
        <span id="quant-items-card">( ${carrinho.reduce((soma, item) => soma + item.quantidade, 0)} )</span>
        Ver meu carrinho - Total: R$ ${totalCarrinho.toFixed(2)}
        <i class="fa fa-cart-plus text-lg text-white"></i>
    `;
    abrirModalCarrinho();

    // Fecha o modal se não houver mais itens
    if (carrinho.length === 0) {
        fecharModalCarrinho();
    }
}

// Função para fechar o modal
function fecharModalCarrinho() {
    modalCarrinho.classList.add('hidden');
}

// Evento para abrir o modal ao clicar no botão do footer
btnCarrinho.addEventListener('click', abrirModalCarrinho);

// ======================
// 📌 Parte 5: Enviar pedido
// ======================

function enviarPedido() {
    const inputEndereco = document.getElementById('input-endereco');
    const mensagemErro = document.getElementById('mensagem-erro');
    const metodoPagamentoSelecionado = document.getElementById('metodo-pagamento').value;

    if (!inputEndereco.value.trim()) {
        mensagemErro.classList.remove('hidden');
        inputEndereco.classList.add('border-red-500');
        return;
    }

    if (!metodoPagamentoSelecionado) {
        alert("Por favor, selecione um método de pagamento.");
        return;
    }

    // Formata os itens do carrinho em texto para o WhatsApp
    let mensagem = "*Meu Pedido:*%0A";
    carrinho.forEach((item, index) => {
        let extraInfo = "";

        // Se for "Galão 20L [Troca]", adiciona o ano de fabricação
        if (item.nome === "Galão 20L [Troca]") {
            const anoFabricacao = document.getElementById(`fabricacao-${index}`).value;
            if (!anoFabricacao) {
                alert("Por favor, selecione o ano de fabricação para o Galão 20L [Troca].");
                return;
            }
            extraInfo = ` - Ano de Fabricação: ${anoFabricacao}`;
        }

        mensagem += `- ${item.nome} (x${item.quantidade}) - R$ ${item.total.toFixed(2)}${extraInfo}%0A`;
    });

    mensagem += `%0A*Total:* R$ ${totalCarrinho.toFixed(2)}%0A`;
    mensagem += `*Endereço:* ${inputEndereco.value.trim()}%0A`;
    mensagem += `*Método de Pagamento:* ${metodoPagamentoSelecionado}%0A`;

    // Envia o pedido via WhatsApp
    const numeroWhatsApp = "5519987277180";
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
    window.open(urlWhatsApp, '_blank');

    // Limpa o carrinho e a memória
    carrinho = [];
    totalCarrinho = 0;
    enderecoSalvo = '';
    pagamentoSalvo = '';

    // Atualiza o footer para exibir carrinho vazio
    quantidadeItensCard.textContent = `( 0 )`;
    btnCarrinho.innerHTML = `
        <span id="quant-items-card">( 0 )</span>
        Ver meu carrinho - Total: R$ 0.00
        <i class="fa fa-cart-plus text-lg text-white"></i>
    `;

    // Fecha o modal
    fecharModalCarrinho();
}
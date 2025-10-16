const prompt = require('prompt-sync')();

let lista_clientes = [];
let lista_produtos = [];
let lista_vendas = [];

function cadastrar_cliente() { // Fazer o cadastro dos clientes
  console.clear();
  console.log("=== CADASTRO DE CLIENTE ===");
  let nome = prompt('Digite o nome: ');
  let idade = parseInt(prompt('Digite a idade: '));
  let sexo = prompt('Digite o sexo (M/F): ');
  let endereco = prompt('Digite o endereço: ');
  if (nome && idade > 0 && (sexo === 'M' || sexo === 'F') && endereco) {
    let cliente = {
      nome: nome,
      idade: idade,
      sexo: sexo,
      endereco: endereco,
    };
    lista_clientes.push(cliente);
    console.log("Cliente cadastrado com sucesso!");
  } else {
    console.log("Dados inválidos. Tente novamente.");
  }
  prompt("Digite ENTER para continuar");
}

function cadastrar_produto() { // Fazer o cadastro dos produtos
  console.clear();
  console.log("=== CADASTRO DE PRODUTO ===");
  let nome = prompt('Digite o nome do produto: ');
  let preco = parseFloat(prompt('Digite o preço: '));
  let quantidade = parseInt(prompt('Digite a quantidade em estoque: '));
  if (nome && preco > 0 && quantidade >= 0) {
    let produto = {
      nome: nome,
      preco: preco,
      quantidade: quantidade,
    };
    lista_produtos.push(produto);
    console.log("Produto cadastrado com sucesso!");
  } else {
    console.log("Dados inválidos. Tente novamente.");
  }
  prompt("Digite ENTER para continuar");
}

function cadastrar_venda() { // Fazer o cadastro das vendas
  console.clear();
  console.log("=== CADASTRO DE VENDA ===");
  if (lista_clientes.length === 0 || lista_produtos.length === 0) {
    console.log("É necessário ter pelo menos um cliente e um produto cadastrados."); // se caso não tenha cliente ou produto cadastrado
    prompt("Digite ENTER para continuar");
    return;
  }
  console.log("Clientes disponíveis:"); // mostra os clientes cadastrados
  lista_clientes.forEach((cliente, index) => {
    console.log(`${index + 1}. ${cliente.nome}`); // mostra o nome do cliente
  });
  let clienteIndex = parseInt(prompt('Escolha o número do cliente: ')) - 1; // escolhe o cliente
  if (clienteIndex < 0 || clienteIndex >= lista_clientes.length) { // se caso o cliente escolhido for inválido
    console.log("Cliente inválido.");
    prompt("Digite ENTER para continuar");
    return;
  }
  console.log("Produtos disponíveis:"); // mostra os produtos cadastrados
  lista_produtos.forEach((produto, index) => {
    console.log(`${index + 1}. ${produto.nome} - R$ ${produto.preco} (Estoque: ${produto.quantidade})`); // mostra o nome do produto, preço e quantidade em estoque
  });
  let produtoIndex = parseInt(prompt('Escolha o número do produto: ')) - 1; // escolhe o produto
  if (produtoIndex < 0 || produtoIndex >= lista_produtos.length) { // se caso o produto escolhido for inválido
    console.log("Produto inválido.");
    prompt("Digite ENTER para continuar");
    return;
  }
  let quantidade = parseInt(prompt('Digite a quantidade: ')); // escolhe a quantidade do produto
  if (quantidade <= 0 || quantidade > lista_produtos[produtoIndex].quantidade) { // se caso a quantidade for inválida ou maior que a quantidade em estoque
    console.log("Quantidade inválida ou insuficiente em estoque.");
    prompt("Digite ENTER para continuar");
    return;
  }
  let venda = { // cria o objeto venda
    cliente: lista_clientes[clienteIndex].nome,
    produto: lista_produtos[produtoIndex].nome,
    quantidade: quantidade,
    total: quantidade * lista_produtos[produtoIndex].preco,
    data: new Date().toLocaleString(), // registra a dota e hora em que a venda foi realizada
  };
  lista_vendas.push(venda); // adiciona a venda na lista de vendas
  lista_produtos[produtoIndex].quantidade -= quantidade; // atualiza a quantidade em estoque do produto
  console.log("Venda cadastrada com sucesso!");
  prompt("Digite ENTER para continuar");
}

function listar_clientes() { // Listar os clientes cadastrados
  console.clear();
  console.log("=== LISTA DE CLIENTES ==="); // mostra os clientes cadastrados
  if (lista_clientes.length === 0) { 
    console.log("Nenhum cliente cadastrado."); // se caso não tenha cliente cadastrado  
  } else {
    lista_clientes.forEach((cliente, index) => {
      console.log(`${index + 1}. Nome: ${cliente.nome}, Idade: ${cliente.idade}, Sexo: ${cliente.sexo}, Endereço: ${cliente.endereco}`); // mostra o nome, idade, sexo e endereço do cliente, mostra tudo isso em uma lista numerada
    });
  }
  prompt("Digite ENTER para continuar");
}

function listar_produtos() { // Listar os produtos cadastrados
  console.clear();
  console.log("=== LISTA DE PRODUTOS ===");
  if (lista_produtos.length === 0) { 
    console.log("Nenhum produto cadastrado."); // se caso não tenha produto cadastrado
  } else {
    lista_produtos.forEach((produto, index) => { 
      console.log(`${index + 1}. Nome: ${produto.nome}, Preço: R$ ${produto.preco}, Quantidade: ${produto.quantidade}`); // mostra o nome, preço e quantidade do produto, mostra tudo isso em uma lista numerada
    });
  }
  prompt("Digite ENTER para continuar");
}

function listar_vendas() { // Listar as vendas cadastradas
  console.clear();
  console.log("=== LISTA DE VENDAS ===");
  if (lista_vendas.length === 0) {  // se caso não tenha venda cadastrada
    console.log("Nenhuma venda cadastrada.");
  } else {
    lista_vendas.forEach((venda, index) => {
      console.log(`${index + 1}. Cliente: ${venda.cliente}, Produto: ${venda.produto}, Quantidade: ${venda.quantidade}, Total: R$ ${venda.total}, Data: ${venda.data}`); // mostra o nome do cliente, nome do produto, quantidade, total e data da venda, mostra tudo isso em uma lista numerada
    });
  }
  prompt("Digite ENTER para continuar");
}

function remover_cliente() { // Remove cliente cadastrado
  console.clear();
  console.log("=== REMOVER CLIENTE ===");
  if (lista_clientes.length === 0) { // se caso não tenha cliente cadastrado
    console.log("Nenhum cliente cadastrado.");
    prompt("Digite ENTER para continuar");
    return;
  }
  lista_clientes.forEach((cliente, index) => {
    console.log(`${index + 1}. ${cliente.nome}`); // mostra o nome do cliente
  });
  let index = parseInt(prompt('Digite o número do cliente a remover: ')) - 1; // escolhe o cliente a ser removido
  if (index >= 0 && index < lista_clientes.length) { // se caso o cliente escolhido for válido
    lista_clientes.splice(index, 1);
    console.log("Cliente removido com sucesso!");
  } else {
    console.log("Número inválido.");
  }
  prompt("Digite ENTER para continuar");
}

function remover_produto() { // Remove produto cadastrado
  console.clear();
  console.log("=== REMOVER PRODUTO ===");
  if (lista_produtos.length === 0) { // se caso não tenha produto cadastrado
    console.log("Nenhum produto cadastrado.");
    prompt("Digite ENTER para continuar");
    return;
  }
  lista_produtos.forEach((produto, index) => {
    console.log(`${index + 1}. ${produto.nome}`); // mostra o nome do produto
  });
  let index = parseInt(prompt('Digite o número do produto a remover: ')) - 1; // escolhe o produto a ser removido
  if (index >= 0 && index < lista_produtos.length) { // se caso o produto escolhido for válido
    lista_produtos.splice(index, 1); // remove o produto da lista
    console.log("Produto removido com sucesso!");
  } else {
    console.log("Número inválido.");
  }
  prompt("Digite ENTER para continuar");
}

function remover_venda() { // Remove venda cadastrada
  console.clear();
  console.log("=== REMOVER VENDA ==="); 
  if (lista_vendas.length === 0) { // se caso não tenha venda cadastrada
    console.log("Nenhuma venda cadastrada.");
    prompt("Digite ENTER para continuar");
    return;
  }
  lista_vendas.forEach((venda, index) => {
    console.log(`${index + 1}. Cliente: ${venda.cliente}, Produto: ${venda.produto}, Total: R$ ${venda.total}`); // mostra o nome do cliente, nome do produto e total da venda
  });
  let index = parseInt(prompt('Digite o número da venda a remover: ')) - 1; // escolhe a venda a ser removida
  if (index >= 0 && index < lista_vendas.length) { // se caso a venda escolhida for válida

    let venda = lista_vendas[index]; // recupera a venda para atualizar o estoque do produto
    let produto = lista_produtos.find(p => p.nome === venda.produto); // encontra o produto correspondente na lista de produtos
    if (produto) {
      produto.quantidade += venda.quantidade; // atualiza a quantidade em estoque do produto
    }
    lista_vendas.splice(index, 1); // remove a venda da lista
    console.log("Venda removida com sucesso!");
  } else {
    console.log("Número inválido.");
  }
  prompt("Digite ENTER para continuar");
}

do { // Menu principal
  console.clear();
  console.log("============= MENU ================");
  console.log("== 1) Cadastro de Cliente          ");
  console.log("== 2) Cadastro de Produto          ");
  console.log("== 3) Cadastro de Venda            ");
  console.log("== 4) Listar Clientes              ");
  console.log("== 5) Listar Produtos              ");
  console.log("== 6) Listar Vendas                ");
  console.log("== 7) Remover Cliente              ");
  console.log("== 8) Remover Produto              ");
  console.log("== 9) Remover Venda                ");
  console.log("== 0) Sair                         ");
  console.log("===================================");
  let opc = parseInt(prompt("Informe uma opção: ")); // Escolha uma opcão
  if (opc === 1) { //chama as funções de repetição a baixo
    cadastrar_cliente();
  } else if (opc === 2) {
    cadastrar_produto();
  } else if (opc === 3) {
    cadastrar_venda();
  } else if (opc === 4) {
    listar_clientes();
  } else if (opc === 5) {
    listar_produtos();
  } else if (opc === 6) {
    listar_vendas();
  } else if (opc === 7) {
    remover_cliente();
  } else if (opc === 8) {
    remover_produto();
  } else if (opc === 9) {
    remover_venda();
  } else if (opc === 0) {
    console.log("Saindo...");
    break;
  } else { // Caso não seja nenhuma das opções acima
    console.log("Opção inválida. Tente novamente.");
    prompt("Digite ENTER para continuar");
  }
} while (true);

import { ProdutoController } from './src/Controller/ProdutoController';
import { Cosmetico } from './src/Model/Cosmetico';
import { Medicamento } from './src/Model/Medicamento';
import { Produto } from './src/Model/Produto';
import { colors } from './src/Util/Colors';
import { formatarMoeda } from './src/Util/Currency';
import { Input } from './src/Util/Input';

const produtos = new ProdutoController();

const tipoProduto = ['Medicamento', 'Cosméticos'];

criarContasTeste();

export function main(){

    let opcao: number;

    while(true) {
        console.log(colors.fg.cyan, ' ***********************************************************  ');
        console.log('  |                         Fármacia                        |  ');
        console.log('  ***********************************************************  ');
        console.log('  |                   O que você deseja?                    |  ');
        console.log('  |---------------------------------------------------------|  ');
        console.log('  | 1 - Cadastrar Produtos      | 2 - Lista de Produtos     |  ');
        console.log('  | 3 - Buscar Produto id       | 4 - Buscar Produto Nome   |  ');
        console.log('  | 5 - Atualizar Produtos      | 6 - Deletar Produto       |  ');
        console.log('  | 0 - Sair                    |                           |  ');
        console.log('  *********************************************************** ', colors.reset);

        console.log(colors.fg.whitestrong, '\nEntre com a opção desejada: ');
        opcao = Input.questionInt('');
        console.log(colors.reset);

        if (opcao === 0) {
            console.log(colors.fg.cyanstrong, '\nFármacia, Sua saúde me primeiro Lugar', colors.reset);
            sobre();
            process.exit(0);
        }

        switch(opcao) {
            case 1: 
                console.log(colors.fg.cyanstrong, '\nCadastrar Produtos\n', colors.reset);
                cadastrarProduto();
                keyPress();
            break;

            case 2: 
                console.log(colors.fg.cyanstrong, '\nListar Produtos\n', colors.reset);
                listarTodosProdutos();
                keyPress();
            break;

            case 3: 
                console.log(colors.fg.cyanstrong, '\nBuscar Produtos Por ID\n', colors.reset);
                consultarProdutoId();
                keyPress();
            break;

            case 4: 
                console.log(colors.fg.cyanstrong, '\nBuscar Produtos Por Nome\n', colors.reset);
                consultarPorNome();
                keyPress()
            break;

            case 5:
                console.log(colors.fg.cyanstrong, '\nAtualizar Produtos\n', colors.reset);
                atualizarProduto();
                keyPress();
            break;

            case 6:
                console.log(colors.fg.cyanstrong, '\nDeletar Produtos\n', colors.reset);
                deletarProduto();
                keyPress();
            break;

            default: 
                console.log(colors.fg.red, '\nOpção inválida!\n', colors.reset);
        }
    }
}

// Case 1 - Cadastrar
function cadastrarProduto(): void {
    console.log('Nome do produto: ');
    const nome = Input.question('');

    console.log('Tipo de produto: ');
    const tipo = Input.keyInSelect(tipoProduto, '', { cancel: false }) + 1;

    console.log('Preço do produto: ');
    const preco = Input.questionInt('');

    switch(tipo) {
        case 1:
            const generico = '';
            produtos.cadastrarProduto(new Medicamento (produtos.gerarId(), nome, tipo, preco, generico));
            break;

        case 2:
            const fragancia = '';
            produtos.cadastrarProduto(new Cosmetico (produtos.gerarId(), nome, tipo, preco, fragancia));
            break;

        default:
            console.log(colors.fg.red, 'Digite uma opção válida!', colors.reset); 
    }
}

// Case 2 - Listar
function listarTodosProdutos(): void {
    produtos.listarTodosProdutos();
} 

// Case 3 - Buscar Produto
function consultarProdutoId(): void {

    console.log('Digite o número do produto: ');
    const id = Input.questionInt('');

    produtos.consultarProdutoId(id);
}

// Case 4 - Buscar Produto Por Nome
function consultarPorNome(): void {
    console.log('Digite o nome do produto: ');
    const nome = Input.question('');

    produtos.consultarPorNome(nome);
}


// Case 5 - Atualizar Produtos
function atualizarProduto(): void {

    console.log(colors.fg.cyan, "\nATUALIZAR PRODUTO", colors.reset);
    console.log("1 - Atualizar por ID");
    console.log("2 - Atualizar por Nome");

    const opcao = Input.keyInSelect(
        ['1 - ID', '2 - Nome'],
        'Como deseja atualizar?',
        { cancel: false }
    );

    let escolha: number | string;
    let produto: Produto | null;

    if (opcao === 0) {
        console.log('Digite o Id do Produto: ');
        escolha = Input.questionInt('');
        produto = produtos.buscarProduto(escolha);
    } else {
        console.log('Digite o nome do produto: ');
        escolha = Input.question('');
        produto = produtos.buscarNome(produtos.formatarNome(escolha));
    }

    if (produto !== null) {

        
        let nome = produto.nome;
        let tipo = produto.tipo;
        let preco = produto.preco;

        console.log(`\nNome Atual: ${nome}`);
        console.log(`Digite o novo nome: `);
        console.log(`(Pressione ENTER para manter o atual)`);
        nome = Input.question('', { defaultInput: nome });

        console.log(`\nTipo Atual: ${tipo}`);
        console.log(`Digite o novo tipo: `);
        console.log(`(Pressione ENTER para manter o atual)`);
        tipo = Input.questionInt('', { defaultInput: tipo });

        console.log(`\nPreço Atual: ${formatarMoeda(preco)}`);
        console.log(`Digite o novo preço: `);
        console.log(`(Pressione ENTER para manter o atual)`);
        preco = Input.questionFloat('', { defaultInput: preco });

        switch (tipo) {
            case 1:
                let generico: string = (produto as Medicamento).generico;

                console.log(`\nFormula Atual: ${generico}`);
                console.log(`Digite a nova formula: `);
                console.log(`(Pressione ENTER para manter a atual)`);
                generico = Input.question('', { defaultInput: generico });

                produtos.atualizarProduto(escolha, new Medicamento(produto.id, nome, tipo, preco, generico));
            break;

            case 2:
                let fragancia: string = (produto as Cosmetico).fragancia;

                console.log(`\nFragancia Atual: ${fragancia}`);
                console.log(`Digite a nova fragancia: `);
                console.log(`(Pressione ENTER para manter a atual)`);
                fragancia = Input.question('', { defaultInput: fragancia });

                produtos.atualizarProduto(escolha, new Cosmetico(produto.id, nome, tipo, preco, fragancia));
                break;
        }

    } else {
        console.log(colors.fg.red, `Produto ${escolha} não encontrado!`, colors.reset);
    }
}


// Case 6 - Deletar Produto
function deletarProduto(): void {

    console.log(colors.fg.cyan, "\nDELETAR PRODUTO", colors.reset);
    console.log("1 - Deletar por ID");
    console.log("2 - Deletar por Nome");

    const opcao = Input.keyInSelect(
        ['1 - ID', '2 - Nome'],
        'Como deseja deletar?',
        { cancel: false }
    );

    let escolha: number | string;

    if (opcao === 0) {
        console.log('Digite o Id do Produto: ');
        escolha = Input.questionInt('');
    } else {
        console.log('Digite o nome do Produto: ');
        escolha = Input.question('');
    }

    produtos.deletarProduto(escolha);
}


// Informações do Criador do Projeto
function sobre(): void {
    console.log(colors.bg.cyan, colors.fg.blackstrong, '\n   ***************************************************');
    console.log('   |            Projeto Desenvolvido por:            |  ');
    console.log('   |  Sabrina Novaes - sabrinanovaes_96@hotmail.com  |  ');
    console.log('   |           github.com/SabrinaNovaes              |  ');
    console.log('   ***************************************************\n',colors.reset);
}

// Função de pausa entre as opções do menu 
function keyPress(): void {
    console.log(colors.reset, "\nPressione enter para continuar...");
    Input.prompt();
}

function criarContasTeste(): void {

    // Instâncias da Classe Medicamentos
    produtos.cadastrarProduto(new Medicamento(produtos.gerarId(), 'Omeprazol', 1, 12.99, 'Original'));
    produtos.cadastrarProduto(new Medicamento(produtos.gerarId(), 'Simeticona', 1, 10.90, 'Genérico'));

    // Instâncias da Classe Cosmeticos
    produtos.cadastrarProduto(new Cosmetico(produtos.gerarId(), 'Perfume',2, 59.90, 'Floral'));
    produtos.cadastrarProduto(new Cosmetico(produtos.gerarId(), 'Body Splash', 2, 39.90, 'Baunilha'));

}

main();

function gerarId() {
    throw new Error('Function not implemented.');
}

import { Produto } from "../Model/Produto";

export interface ProdutoRepository {

    // Métodos do CRUD
    consultarProdutoId(id: number): void;
    consultarPorNome(nome: string): void;
    listarTodosProdutos(): void;
    cadastrarProduto(produto: Produto): void;
    atualizarProduto(id: number | string, produto: Produto): void;
    deletarProduto(id: number): void;
    
} 


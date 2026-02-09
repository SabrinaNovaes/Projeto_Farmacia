import { Produto } from "../Model/Produto";
import { ProdutoRepository } from "../Repository/IProdutoRepository";
import { colors } from "../Util/Colors";
import { Input } from "../Util/Input";

export class ProdutoController implements ProdutoRepository {
    private listarProdutos = new Array<Produto>();

    public numeroId: number = 0;

    consultarProdutoId(id: number): void {
        const buscarProdutoId = this.buscarProduto(id);

        if (buscarProdutoId !== null) buscarProdutoId.visualizar();
        else
            console.log(
                colors.fg.red,
                `\nProduto id ${id} não encontrado!`,
                colors.reset,
            );
    }

    consultarPorNome(nome: string): void {
        const nomeFormatado = this.formatarNome(nome);
        const buscarProdutoNome = this.buscarNome(nomeFormatado);

        if (buscarProdutoNome !== null) buscarProdutoNome.visualizar();
        else
            console.log(
                colors.fg.red,
                `\nProduto ${nomeFormatado} não encontrado!`,
                colors.reset,
            );
    }

    listarTodosProdutos(): void {
        for (let produto of this.listarProdutos) {
            produto.visualizar();
        }
    }

    cadastrarProduto(produto: Produto): void {
        produto.nome = this.formatarNome(produto.nome);

        this.listarProdutos.push(produto);
        console.log(
            colors.fg.green,
            `\nProduto ${produto.nome} cadastrado com sucesso!`,
            colors.reset,
        );
    }

    atualizarProduto(id: number | string, produto: Produto): void {
        let produtoEncontrado: Produto | null;

        if (typeof id === "number") {
            produtoEncontrado = this.buscarProduto(id);
        } else {
            const nomeFormatado = this.formatarNome(id);
            produtoEncontrado = this.buscarNome(nomeFormatado);
        }

        if (produtoEncontrado !== null) {
            produto.id = produtoEncontrado.id; // mantém o id
            produto.nome = this.formatarNome(produto.nome);

            this.listarProdutos[this.listarProdutos.indexOf(produtoEncontrado)] =
                produto;

            console.log(
                colors.fg.green,
                `\nProduto ${produto.nome} atualizado com sucesso!`,
                colors.reset,
            );
            return;
        }

        console.log(colors.fg.red, `\nProduto não encontrado!`, colors.reset);
    }

    deletarProduto(idOuNome: number | string): void {
        let produtoEncontrado: Produto | null;

        if (typeof idOuNome === "number") {
            produtoEncontrado = this.buscarProduto(idOuNome);
        } else {
            const nomeFormatado = this.formatarNome(idOuNome);
            produtoEncontrado = this.buscarNome(nomeFormatado);
        }

        if (!produtoEncontrado) {
            console.log(
                colors.fg.red,
                `\nProduto ${idOuNome} não encontrado!`,
                colors.reset,
            );
            return;
        }

        console.log(
            colors.fg.yellow,
            `O Produto ${produtoEncontrado.nome} está prestes a ser deletado`,
            colors.reset,
        );

        const confirma = Input.keyInSelect(
            ["1 - Sim", "2 - Não"],
            "Deseja deletar?",
            { cancel: false },
        );

        if (confirma === 0) {
            this.listarProdutos.splice(
                this.listarProdutos.indexOf(produtoEncontrado),
                1,
            );
            console.log(
                colors.fg.green,
                `\nProduto ${produtoEncontrado.nome} foi deletado com sucesso!`,
                colors.reset,
            );
        } else {
            console.log(colors.fg.magenta, "\nOperação cancelada!");
        }
    }

    // Métodos Auxiliares

    // Buscar no Array listarProdutos
    public buscarProduto(id: number): Produto | null {
        for (let produto of this.listarProdutos) {
            if (produto.id === id) {
                return produto;
            }
        }
        return null;
    }

    // Buscar pelo nome do Produto no Array
    public buscarNome(nome: string): Produto | null {
        for (let produto of this.listarProdutos) {
            if (produto.nome === nome) {
                return produto;
            }
        }
        return null;
    }

    // Formatar o nome do Produto
    public formatarNome(nome: string): string {
        if (!nome) return "";
        return nome
            .toLowerCase()
            .split(" ")
            .map(
                (minusculo) => minusculo.charAt(0).toUpperCase() + minusculo.slice(1),
            )
            .join(" ");
    }

    // Incrementa o id
    public gerarId(): number {
        return ++this.numeroId;
    }
}

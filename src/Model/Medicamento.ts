import { Produto } from "./Produto";

export class Medicamento extends Produto {

    private _generico: string;

	constructor(id: number, nome: string, tipo: number, preco: number, generico: string) {
        super(id, nome, tipo, preco);
		this._generico = generico;
	}

	public get generico(): string {
		return this._generico;
	}

	public set generico(value: string) {
		this._generico = value;
	}

    // Método visualizar sobrescrito (polimorfismo)
    public visualizar(): void {
        super.visualizar();
        console.log(`Tipo de Medicamento: ${this._generico}`);
    }

}
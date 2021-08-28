export interface ProdutoModel {
    //? deixa o id como opcional
    id?: number,
    nome: string,
    preco: number,
    selected?: boolean,
    categoria: {
        id: string;
    }
}

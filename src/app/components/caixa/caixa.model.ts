export interface CaixaModel {
    id?: number,
    nome: string,
    valorAbertura?: number
    valorFechamento?: number
    dataAbertura:string,
    dataFechamento:string,
    valorFechamentoAvista?: number,
    valorFechamentoCartao?: number,
    diferencaAvista?: number,
    diferencaCartao?: number
}

export interface PagamentoModel {
    id?: number,
    idModoPagamento: string
    porcentagemDesconto: number
    valorPagamento: number
    idVenda?: number
    quantidadeParcela?: number
    dataPagamento: string
    troco: number


}

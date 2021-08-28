export interface VendaModel {
    id?: number,
    nomeComanda: string
    finalizada: boolean
    subTotal: string
    valorTotal: number
    dataCriacaoVenda: string
    dataFechamentoVenda: string
    porcentagemDesconto:number
}

export interface ModoPagamentoModel {
    id?: number,
    descricao: string
    taxa : number
    porcentagemDesconto:number
    troco?:boolean
    aVista?:boolean
}

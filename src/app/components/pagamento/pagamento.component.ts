import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {ModoPagamentoService} from "../modo-pagamento/modo-pagamento.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {VendaModel} from "../venda/venda.model";
import {VendaService} from "../venda/venda.service";
import {PagamentoModel} from "./pagamento.model";
import {PagamentoService} from "./pagamento.service";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";


@Component({
    selector: 'app-pagamento',
    templateUrl: './pagamento.component.html',
    styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {


    displayedColumns: string[] = ['modoPagamento', 'quantidadeParcela', 'valorPagamento'];
    dataSource: MatTableDataSource<PagamentoModel>;
    modosPagamentos: any
    pagamento: FormGroup;
    pagamentos: PagamentoModel [] = [];
    modoPagamento: any;
    restante: number;
    troco: number;


    venda: VendaModel = {
        id: 0,
        nomeComanda: '',
        finalizada: false,
        subTotal: '',
        valorTotal: 0,
        dataCriacaoVenda: '',
        dataFechamentoVenda: '',
        porcentagemDesconto: 0
    }

    pagamentoModel: PagamentoModel = {
        id: 0,
        idModoPagamento: '',
        porcentagemDesconto: 0,
        valorPagamento: 0,
        idVenda: this.data.id,
        quantidadeParcela: 0,
        dataPagamento: '',
        troco: 0
    }

    constructor(
        public dialogRef: MatDialogRef<PagamentoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private modoPagamentoService: ModoPagamentoService, private vendaService: VendaService, private pagamentoService: PagamentoService, private fb: FormBuilder, private router: Router,) {
        this.dataSource = new MatTableDataSource(this.pagamentos);

    }

    ngOnInit(): void {
        this.pagamento = this.fb.group({
            id: [{value: '', disabled: true}],
            modoPagamento: [{value: '', disabled: false,}],
            total: [{value: this.venda.valorTotal, disabled: true}],
            restante: [{value: 0.00, disabled: true}],
            subTotal: [{value: this.venda.subTotal, disabled: true}],
            porcentagemDesconto: [{value: '', disabled: true}],
            valorPagamento: [{value: '', disabled: true}, Validators.required],
            idVenda: [{value: this.data.id, disabled: false}],
            quantidadeParcela: [{value: '', disabled: true}, Validators.required],
            troco: [{value: '', disabled: true}],

        })

        this.vendaFindById();
        this.findAllPagamentos();
        this.findAllModosPagamentos()

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    get c() {
        return this.pagamento.controls
    }

    private findAllModosPagamentos() {
        this.modoPagamentoService.findAll().subscribe(modoPagamento => {
            this.modosPagamentos = modoPagamento
        })
    }

    private vendaFindById() {
        this.vendaService.findById(this.data.id).subscribe(venda => {
            this.venda = venda;
        })
    }

    addPagamento() {
        if (this.pagamento.invalid || this.pagamento.controls.valorPagamento.value == 0
            || (this.pagamento.controls.valorPagamento.value > this.restante && !this.modoPagamento.aVista)
        ) {
            this.modoPagamentoService.mostrarMessagem("Erro ao adicionar pagamento", true)
            this.pagamento.controls.valorPagamento.setValue(0)
            return;
        } else if (!this.modoPagamento.aVista) {
            this.pagamentoService.insert(this.pagamento.value).subscribe(pagamento => {
                this.pagamentoModel = pagamento
                this.pagamentos.push({...this.pagamentoModel})
                this.dataSource = new MatTableDataSource(this.pagamentos);
                this.calculaRestante();
            })
        } else if (this.modoPagamento.aVista) {
            console.log("a vista")
            if(this.pagamento.controls.valorPagamento.value > this.restante){
                this.pagamento.controls.valorPagamento.setValue(this.restante);
            }
            this.pagamentoService.insert(this.pagamento.value).subscribe(pagamento => {
                this.pagamentoModel = pagamento
                this.pagamentos.push({...this.pagamentoModel})
                this.dataSource = new MatTableDataSource(this.pagamentos);
                this.calculaRestante();
                this.verificaTroco();
            })
        }
    }

    findAllPagamentos() {
        this.pagamentoService.findByVendaId(this.data.id).subscribe(pagamentos => {
            this.pagamentos = pagamentos
            this.dataSource = new MatTableDataSource(this.pagamentos);
            this.somaRestante();
        })
    }

    selectModoPgto(modoPagamento: any) {
        this.modoPagamento = modoPagamento;
        this.pagamento.controls.porcentagemDesconto.enable();
        this.pagamento.controls.valorPagamento.enable();
        this.pagamento.controls.quantidadeParcela.enable();
        this.pagamento.controls.quantidadeParcela.setValue('1');
        this.pagamento.controls.troco.setValue(0);
        this.pagamento.controls.valorPagamento.setValue(0)
    }

    recalculaTotal() {
        var porcentagem = this.pagamento.controls.porcentagemDesconto.value / 100;
        var sub = this.venda.valorTotal;
        var valorDesconto = porcentagem * sub;
        if (valorDesconto >= 0 && porcentagem <= this.modoPagamento.porcentagemDesconto / 100) {
            this.pagamento.controls.total.setValue(this.venda.valorTotal - valorDesconto);
        } else {
            this.modoPagamentoService.mostrarMessagem("Porcentagem não permitida", true)
            this.pagamento.controls.porcentagemDesconto.setValue(0);
        }
    }


    somaRestante() {
        var soma = 0;
        for (let pagamento of this.pagamentos) {
            soma += pagamento.valorPagamento;
        }
        this.restante = this.venda.valorTotal - soma;

    }


    somaTroco() {
        this.pagamento.controls.troco.setValue(this.pagamento.controls.valorPagamento.value - this.restante);
        this.troco = this.pagamento.controls.valorPagamento.value - this.restante;
    }

    verificaTroco() {
        if (this.modoPagamento.aVista && this.pagamento.controls.valorPagamento.value > this.restante && this.restante != 0) {
            this.pagamento.controls.troco.setValue(this.pagamento.controls.valorPagamento.value - this.restante);
            // this.pagamento.controls.valorPagamento.setValue(0.00)
        }
    }


    onSubmit()
        :
        void {
        // Process checkout data here
        // this.items = this.cartService.clearCart();
        // console.warn('Your order has been submitted', this.checkoutForm.value);
        // this.checkoutForm.reset();
    }

    private calculaRestante() {
        if (this.pagamento.controls.valorPagamento.value <= this.restante) {
            this.restante -= this.pagamento.controls.valorPagamento.value;
        } else if (this.pagamento.controls.valorPagamento.value >= this.restante && this.modoPagamento.aVista) {
            this.restante = 0;
        }
    }

    finalizaVenda() {
        if (this.restante == 0) {
            this.vendaService.finalizaVenda(this.data.id).subscribe(venda => {
                this.vendaService.mostrarMessagem('Venda criada com sucesso!', false)
                this.dialogRef.close();
                this.router.navigate(["imprime-comprovante"]);
            })
        }
    }
}

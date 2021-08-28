import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CaixaService} from "../caixa.service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {Observable} from "rxjs";
import {ProdutoModel} from "../../produto/produto.model";
import {CaixaModel} from "../caixa.model";

@Component({
    selector: 'app-fecha-caixa',
    templateUrl: './fecha-caixa.component.html',
    styleUrls: ['./fecha-caixa.component.css']
})
export class FechaCaixaComponent implements OnInit {

    caixa: FormGroup
    caixaF: CaixaModel;

    constructor(private caixaService: CaixaService,
                private router: Router,
                private fb: FormBuilder) {
    }

    ngOnInit(): void {

        this.caixa = this.fb.group({
            id: [{value: ''}],
            nome: [{value: '', disabled: true}],
            data: [{value: '', disabled: true}],
            valorInicial: [{value: '', disabled: true}],
            valorTotalCaixa: [{value: '', disabled: true}],
            valorTotalAvista: [{value: '', disabled: true}],
            valorFechamentoAvista: [{value:'', disabled: false}],
            valorTotalCartao: [{value: '', disabled: true}],
            valorTotalCartaoFechamento: [{value: '',disabled: false}],
            diferencaCartao: [{value: '',disabled: true}],
            diferencaAvista: [{value: '',disabled: true}]
        })

        this.getCaixaFechar();
    }

    get c() {
        return this.caixa.controls
    }

    fecharCaixa(): void {

        console.log(this.caixa)
        if (this.caixa.invalid) {
            return;
        }

        this.caixaF.diferencaAvista = this.caixa.controls.diferencaAvista.value.replace('R$ ', '');
        this.caixaF.diferencaCartao = this.caixa.controls.diferencaCartao.value.replace('R$ ', '');
        this.caixaF.nome = this.caixa.controls.nome.value;

        //subscribe depois que ele recebe o retorno do back-end ele chama essa arrow function
        this.caixaService.update(this.caixaF).subscribe(() => {
            this.caixaService.mostrarMessagem('Caixa fechado com sucesso!', false)
            this.router.navigate(["/caixa"]);

        })

    }

    getCaixaFechar() {
        this.caixaService.getCaixaFechar().subscribe(caixa => {
            this.caixaF = caixa;
            this.caixa.controls.id.setValue(this.caixaF.id)
            this.caixa.controls.nome.setValue(this.caixaF.nome)
            this.caixa.controls.valorInicial.setValue(this.caixaF.valorAbertura)
            this.caixa.controls.valorTotalCaixa.setValue(this.caixaF.valorFechamento)
            this.caixa.controls.data.setValue(this.caixaF.dataAbertura)
            this.caixa.controls.valorTotalAvista.setValue(this.caixaF.valorFechamentoAvista)
            this.caixa.controls.valorTotalCartao.setValue(this.caixaF.valorFechamentoCartao)
        })
    }
    cancelar(): void {
        this.router.navigate(["/"]);
    }

    verificaDiferenca() {
        this.caixa.controls.diferencaAvista.setValue('R$ ' + (this.caixa.controls.valorTotalAvista.value - this.caixa.controls.valorFechamentoAvista.value));
        this.caixa.controls.diferencaCartao.setValue('R$ ' + (this.caixa.controls.valorTotalCartao.value - this.caixa.controls.valorTotalCartaoFechamento.value));

        console.log(this.caixa.controls.diferencaAvista.value)
    }
}

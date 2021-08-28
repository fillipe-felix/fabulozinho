import {Component, OnInit} from '@angular/core';
import {VendaService} from "../../components/venda/venda.service";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

@Component({
    selector: 'app-relatorio-caixa',
    templateUrl: './relatorio-caixa.component.html',
    styleUrls: ['./relatorio-caixa.component.css']
})
export class RelatorioCaixaComponent {


    pdfSrc = "http://localhost:8080/venda/vendas/export/pdf";

    constructor(private vendaService: VendaService,
                private router: Router,
                private fb: FormBuilder) {
    }


}

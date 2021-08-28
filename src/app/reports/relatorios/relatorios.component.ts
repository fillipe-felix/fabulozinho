import { Component, OnInit } from '@angular/core';
import {CategoriaService} from "../../components/categoria/categoria.service";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {VendaService} from "../../components/venda/venda.service";

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css'],

})
export class RelatoriosComponent {

  pdfSrc = "http://localhost:8080/venda/vendas/export/pdf";

  constructor(private vendaService: VendaService,
              private router: Router,
              private fb: FormBuilder) {
  }




}

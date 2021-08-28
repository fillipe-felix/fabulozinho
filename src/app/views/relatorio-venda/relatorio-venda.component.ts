import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HeaderService} from "../../components/template/header/header.service";

@Component({
  selector: 'app-relatorio-venda',
  templateUrl: './relatorio-venda.component.html',
  styleUrls: ['./relatorio-venda.component.css']
})
export class RelatorioVendaComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {

  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {HeaderService} from "../../components/template/header/header.service";


@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      titulo: 'Abertura de comandas',
      icone: 'storefront',
      routeUrl: '/Vendas'
    }
  }

  ngOnInit(): void {
  }

  navegarParaCreateVenda(): void{
    this.router.navigate(['/venda/create'])
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {HeaderService} from "../../components/template/header/header.service";

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      titulo: 'Cadastro de Produtos',
      icone: 'storefront',
      routeUrl: '/Produtos'
    }
  }

  ngOnInit(): void {
  }

  navegarParaProdutoCreate(): void{
    this.router.navigate(['/produtos/create'])
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {HeaderService} from "../../components/template/header/header.service";

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  constructor(private router: Router, headerService: HeaderService) {
    headerService.headerData = {
      titulo: 'Cadastro de Categorias',
      icone: 'category',
      routeUrl: '/Produtos'
    }
  }

  ngOnInit(): void {
  }

  navegarParaCategoriaCreate(): void{
    this.router.navigate(['/categorias/create'])
  }
}

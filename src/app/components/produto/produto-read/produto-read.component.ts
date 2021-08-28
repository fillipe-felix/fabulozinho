import { Component, OnInit } from '@angular/core';
import {ProdutoModel} from "../produto.model";
import {ProdutoService} from "../produto.service";

@Component({
  selector: 'app-produto-read',
  templateUrl: './produto-read.component.html',
  styleUrls: ['./produto-read.component.css']
})
export class ProdutoReadComponent implements OnInit {

  produtos: ProdutoModel[]

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.produtoService.findAll().subscribe(produtos => {
      this.produtos = produtos
      console.log(produtos)
    })
  }

}

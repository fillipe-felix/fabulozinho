import { Component, OnInit } from '@angular/core';
import {ProdutoService} from "../produto.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {ProdutoModel} from "../produto.model";
import {CategoriaModel} from "../../categoria/categoria.model";
import {CategoriaService} from "../../categoria/categoria.service";

@Component({
  selector: 'app-produto-delete',
  templateUrl: './produto-delete.component.html',
  styleUrls: ['./produto-delete.component.css']
})
export class ProdutoDeleteComponent implements OnInit {

  produto: ProdutoModel = {
    nome: '',
    preco: null,
    categoria: {
      id: "0"
    }

  }

  categorias: CategoriaModel[]

  constructor(private produtoService: ProdutoService,
              private categoriaService: CategoriaService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.produtoService.findById(id).subscribe(produto => {
      this.produto = produto
    })

    this.categoriaService.findAll().subscribe(categorias => {
      this.categorias = categorias
      console.log(this.categorias)
    })
  }


  deleteProduto(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.produtoService.delete(id).subscribe( () => {
      this.produtoService.mostrarMessagem('Produto excluido com sucesso!', false)
      this.router.navigate(['/produtos'])
    })
  }

  cancelar(): void {
    this.router.navigate(['/produtos'])
  }
}

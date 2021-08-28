import { Component, OnInit } from '@angular/core';
import {CategoriaService} from "../categoria.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriaModel} from "../categoria.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {

  categoria: CategoriaModel = {
    nome: ''
  }

  constructor(private categoriaService: CategoriaService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    //pega o id selecionado na lista e preenche os inputs
    const id = this.route.snapshot.paramMap.get('id')
    this.categoriaService.findById(id).subscribe(categoria => {
      this.categoria = categoria
    })
  }

  updateCategoria(): void {
    this.categoriaService.update(this.categoria).subscribe(() => {
      this.categoriaService.mostrarMessagem('Categoria atualizada com sucesso!', false)
      this.router.navigate(['/categorias'])
    })
  }

  cancelar(): void {
    this.router.navigate(['/categorias'])
  }
}

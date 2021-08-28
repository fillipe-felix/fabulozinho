import {Component, OnInit} from '@angular/core';
import {ProdutoService} from "../produto.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProdutoModel} from "../produto.model";
import {CategoriaModel} from "../../categoria/categoria.model";
import {CategoriaService} from "../../categoria/categoria.service";

@Component({
    selector: 'app-produto-update',
    templateUrl: './produto-update.component.html',
    styleUrls: ['./produto-update.component.css']
})
export class ProdutoUpdateComponent implements OnInit {

    produto: ProdutoModel = {
        nome: '',
        preco: null,
        categoria: {
            id: ''
        }

    }

    categorias: CategoriaModel[]

    constructor(private produtoService: ProdutoService,
                private categoriaService: CategoriaService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        //pega o id selecionado na lista e preenche os inputs
        const id = this.route.snapshot.paramMap.get('id')
        this.produtoService.findById(id).subscribe(produto => {
            this.produto = produto
            console.log(this.produto.categoria)
        })
        this.findAllCategorias()
    }

    updateProduto(): void {
        this.produtoService.update(this.produto).subscribe(() => {
            this.produtoService.mostrarMessagem('Produto atualizado com sucesso!', false)
            this.router.navigate(['/produtos'])
        })
    }

    cancelar(): void {
        this.router.navigate(['/produtos'])
    }

    findAllCategorias() {
        this.categoriaService.findAll().subscribe(categorias => {
            this.categorias = categorias
            console.log(this.categorias)
        })
    }
}

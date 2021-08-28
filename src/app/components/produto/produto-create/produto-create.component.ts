import {Component, OnInit} from '@angular/core';
import {ProdutoService} from "../produto.service";
import {Router} from "@angular/router";
import {CategoriaService} from "../../categoria/categoria.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-produto-create',
    templateUrl: './produto-create.component.html',
    styleUrls: ['./produto-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {


    produto: FormGroup;
    categorias: any

    constructor(private produtoService: ProdutoService,
                private categoriaService: CategoriaService,
                private router: Router,
                private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.findAllCategorias()

        this.produto = this.fb.group({
            nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            preco: [0, [Validators.required, Validators.min(0.1)]],
            categoria: ['', [Validators.required]]
        })
    }

    get p() {
        return this.produto.controls
    }

    criarProduto(): void {

        if (this.produto.invalid) {
            return;
        }
        //alert('sucesso' + JSON.stringify(this.produto.value.categoria.produtos.nome, null, 4))

        this.produtoService.insert(this.produto.value).subscribe(() => {
            this.produtoService.mostrarMessagem('Produto criado com sucesso!', false)
            this.router.navigate(["/produtos"]);
        })
    }

    cancelar(): void {
        this.router.navigate(["/produtos"]);
    }

    findAllCategorias(): void {
        this.categoriaService.findAll().subscribe(categorias => {
            this.categorias = categorias
            console.log(this.categorias)
        })
    }

}

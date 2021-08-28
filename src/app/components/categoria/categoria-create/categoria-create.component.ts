import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CategoriaService} from "../categoria.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-categoria-create',
    templateUrl: './categoria-create.component.html',
    styleUrls: ['./categoria-create.component.css']
})
export class CategoriaCreateComponent implements OnInit {

    categoria: FormGroup

    constructor(private categoriaService: CategoriaService,
                private router: Router,
                private fb: FormBuilder) {
    }

    ngOnInit(): void {

        this.categoria = this.fb.group({
            nome: ['', Validators.required]
        })
    }

    get c() {
        return this.categoria.controls
    }

    criarCategoria(): void {

        if (this.categoria.invalid) {
            return;
        }

        //subscribe depois que ele recebe o retorno do back-end ele chama essa arrow function
        this.categoriaService.insert(this.categoria.value).subscribe(() => {
            this.categoriaService.mostrarMessagem('Categoria criada com sucesso!', false)
            this.router.navigate(["/categorias"]);
        })
    }

    cancelar(): void {
        this.router.navigate(["/categorias"]);
    }

}

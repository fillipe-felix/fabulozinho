import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoriaService} from "../../categoria/categoria.service";
import {Router} from "@angular/router";
import {CaixaService} from "../caixa.service";

@Component({
  selector: 'app-abre-caixa',
  templateUrl: './abre-caixa.component.html',
  styleUrls: ['./abre-caixa.component.css']
})
export class AbreCaixaComponent implements OnInit {

  caixa: FormGroup

  constructor(private caixaService: CaixaService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.caixa = this.fb.group({
      nome: ['', Validators.required],
      valorAbertura: ['', Validators.required]

    })
  }

  get c() {
    return this.caixa.controls
  }

  criarCaixa(): void {

    if (this.caixa.invalid) {
      return;
    }

    //subscribe depois que ele recebe o retorno do back-end ele chama essa arrow function
    this.caixaService.insert(this.caixa.value).subscribe(() => {
      this.caixaService.mostrarMessagem('Caixa criada com sucesso!', false)
      this.router.navigate(["/caixa"]);

    })

  }

  cancelar(): void {
    this.router.navigate(["/caixa"]);
  }

}

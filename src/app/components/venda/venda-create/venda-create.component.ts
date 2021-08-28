import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoriaService} from "../../categoria/categoria.service";
import {Router} from "@angular/router";
import {VendaService} from "../venda.service";

@Component({
  selector: 'app-venda-create',
  templateUrl: './venda-create.component.html',
  styleUrls: ['./venda-create.component.css']
})
export class VendaCreateComponent implements OnInit {


  venda: FormGroup;

  constructor(private vendaService: VendaService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.venda = this.fb.group({
      nomeComanda: ['', Validators.required]
    })
  }

  get c() {
    return this.venda.controls
  }

  criarVenda(): void {

    if (this.venda.invalid) {
      return;
    }

    //subscribe depois que ele recebe o retorno do back-end ele chama essa arrow function
    this.vendaService.insert(this.venda.value).subscribe(() => {
      this.vendaService.mostrarMessagem('Comanda aberta com sucesso!', false)
      this.router.navigate(["/venda"]);
    })
  }

  cancelar(): void {
    this.router.navigate(["/venda"]);
  }

}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ModoPagamentoService} from "../modo-pagamento.service";

@Component({
  selector: 'app-modo-pagamento-create',
  templateUrl: './modo-pagamento-create.component.html',
  styleUrls: ['./modo-pagamento-create.component.css']
})
export class ModoPagamentoCreateComponent implements OnInit {

  modoPagamento: FormGroup

  constructor(private modoPagamentoService: ModoPagamentoService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.modoPagamento = this.fb.group({
      descricao: ['', Validators.required],
      // taxa: ['', [Validators.required, Validators.min(0.1)]],
      porcentagemDesconto:[''],
      // troco:[false,Validators.required],
      aVista:[false,Validators.required]

    })
  }

  get c() {
    return this.modoPagamento.controls
  }

  criarModoPgto(): void {

    if (this.modoPagamento.invalid) {
      return;
    }
    console.log(this.modoPagamento.value)

    //subscribe depois que ele recebe o retorno do back-end ele chama essa arrow function
    this.modoPagamentoService.insert(this.modoPagamento.value).subscribe(() => {
      this.modoPagamentoService.mostrarMessagem('Modo Pagamento criado com sucesso!', false)
      this.router.navigate(["/modosPagamentos"]);
    })
  }

  cancelar(): void {
    this.router.navigate(["/modosPagamentos"]);
  }
}

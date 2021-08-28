import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HeaderService} from "../../components/template/header/header.service";

@Component({
  selector: 'app-modo-pagamento',
  templateUrl: './modo-pagamento.component.html',
  styleUrls: ['./modo-pagamento.component.css']
})
export class ModoPagamentoComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      titulo: 'Cadastro de Modos de pagamentos',
      icone: 'payment',
      routeUrl: '/ModosPagamentos'
    }
  }

  ngOnInit(): void {
  }

  navegarParaModoPagamentoCreate(): void{
    this.router.navigate(['/modosPagamentos/create'])
  }

}

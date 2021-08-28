import {Component, OnInit} from '@angular/core';
import {CategoriaModel} from "../../categoria/categoria.model";
import {CategoriaService} from "../../categoria/categoria.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ModoPagamentoService} from "../modo-pagamento.service";
import {ModoPagamentoModel} from "../modo-pagamento.model";

@Component({
    selector: 'app-modo-pagamento-update',
    templateUrl: './modo-pagamento-update.component.html',
    styleUrls: ['./modo-pagamento-update.component.css']
})
export class ModoPagamentoUpdateComponent implements OnInit {

    modoPagamento: ModoPagamentoModel = {
        descricao: '',
        taxa: 0,
        porcentagemDesconto: 0,
        troco:false,
        aVista: false,
    }

    constructor(private modoPagamentoService: ModoPagamentoService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        //pega o id selecionado na lista e preenche os inputs
        const id = this.route.snapshot.paramMap.get('id')
        this.modoPagamentoService.findById(id).subscribe(modoPagamento => {
            this.modoPagamento = modoPagamento
        })
    }

    updateModoPagamento(): void {
        this.modoPagamentoService.update(this.modoPagamento).subscribe(() => {
            this.modoPagamentoService.mostrarMessagem('Modo de pagamento atualizado com sucesso!', false)
            this.router.navigate(['/modosPagamentos'])
        })
    }

    cancelar(): void {
        this.router.navigate(['/modosPagamentos'])
    }

}

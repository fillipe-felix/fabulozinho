import {Component, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {ProdutoService} from "../../produto/produto.service";
import {ProdutoModel} from "../../produto/produto.model";
import {ItemVendaModel} from "../itemVenda.model";
import {DialogComponent} from "../../dialog/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {VendaService} from "../venda.service";
import {ItemVendaService} from "../itemVenda.service";
import {ActivatedRoute} from "@angular/router";
import {PagamentoComponent} from "../../pagamento/pagamento.component";


@Component({
    selector: 'app-venda-update',
    templateUrl: './venda-update.component.html',
    styleUrls: ['./venda-update.component.css'],
})
export class VendaUpdateComponent implements OnInit {
    @Input() item = '';


    id: number;
    total: number = 0;
    private sub: any;
    myControl = new FormControl();
    filteredOptions: Observable<ProdutoModel[]>;
    options: ProdutoModel[] = new Array<ProdutoModel>();
    itensVenda: ItemVendaModel [] = [];


    userControl = new FormControl();
    name: string;


    itemVenda: ItemVendaModel = {
        id: 0,
        quantidade: 1,
        subTotal: 0,
        produtoNome: '',
        produtoPreco: 0,
        idProduto: 0,
        idVenda: 0,
    }


    constructor(private route: ActivatedRoute, private itemVendaService: ItemVendaService, private vendaService: VendaService, private produtoService: ProdutoService, public dialog: MatDialog) {

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        })


















































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































        ;
        this.carregaItensVenda();
        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'string' ? value : value.nome),
                map(nome => nome ? this._filter(nome) : this.options)
            );
        this.findAllProdutos();
        this.total = this.atualizaTotal();
    }

    toggleSelection(produto: ProdutoModel) {
        let a: ItemVendaModel;

        produto.selected = !produto.selected;
        if (produto.selected) {

            this.itemVenda.idProduto = produto.id;
            this.itemVenda.produtoNome = produto.nome;
            this.itemVenda.produtoPreco = produto.preco;
            this.itemVenda.quantidade = 1;
            this.itemVenda.subTotal = produto.preco * 1;
            this.itemVenda.idVenda = this.id;
            this.itensVenda.push({...this.itemVenda})
        } else {
            a = this.achaItenVendaSelect(produto.nome);
            this.deleteItemVenda(a);
        }
        this.atualizaTotal();
        this.userControl.setValue(this.itensVenda);
    }

    achaItenVendaSelect(nome: string): ItemVendaModel {
        for (let item of this.itensVenda) {
            if (item.produtoNome === nome) {
                return item;
            }
        }
    }

    displayFn(product: ProdutoModel): string {
        return product && product.nome ? product
            .nome : '';
    }


    optionClicked(event: Event, user: ProdutoModel) {
        event.stopPropagation();
        this.toggleSelection(user);
    }

    removerItemVenda(itemVenda: ItemVendaModel) {
        const i = this.itensVenda.findIndex(value => value.produtoNome === itemVenda.produtoNome && value.produtoNome === itemVenda.produtoNome);
        this.itensVenda.splice(i, 1,)
        const produto = this.options.findIndex(value => value.nome === itemVenda.produtoNome && value.nome === itemVenda.produtoNome);
        this.options[produto].selected = false;
        this.atualizaTotal();

    }

    toggleSelectionItemVenda(itemVenda: ItemVendaModel) {
        if (itemVenda.quantidade > 0) {
            itemVenda.subTotal = itemVenda.quantidade * itemVenda.produtoPreco;

        } else {
            itemVenda.subTotal = itemVenda.quantidade * itemVenda.produtoPreco;
        }
        this.atualizaTotal();
        this.userControl.setValue(this.itensVenda);
    }

    atualizaTotal(): number {
        this.total = 0;
        this.itensVenda.forEach(item => {
            this.total += item.subTotal;
        })
        return;
    }

    private _filter(nome: string): ProdutoModel[] {
        const filterValue = nome.toLowerCase();
        return this.options.filter(option => option.nome.toLowerCase().indexOf(filterValue) === 0);
    }

    private findAllProdutos(): ProdutoModel[] {
        this.produtoService.findAll().subscribe(produtos => {
            produtos.map(prod => this.options.push(prod))

            console.log(this.itensVenda)
            console.log(this.options)
            for (let item of this.itensVenda) {
                for (let produto of this.options) {
                    if (item.produtoNome === produto.nome) {
                        produto.selected = true;
                    }
                }
            }

        })
        return this.options;
    }

    private carregaItensVenda(): ItemVendaModel[] {
        this.itemVendaService.findByVendaId(this.id).subscribe(itens => {
            itens.map(item => this.itensVenda.push({...item}))
            this.atualizaTotal();
        });
        return this.itensVenda;
    }

    deleteItemVenda(itemVenda: ItemVendaModel): void {

        let dialogRef = this.dialog.open(DialogComponent, {
            width: '250px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result == "SIM") {
                if (itemVenda.id != 0) {
                    this.itemVendaService.delete(itemVenda.id, itemVenda.idVenda).subscribe(() => {
                        this.removerItemVenda(itemVenda);
                    })
                } else {
                    this.removerItemVenda(itemVenda);
                }
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    salvarItensVenda() {
        this.itemVendaService.insertItensVenda(this.itensVenda).subscribe(itens => {
            this.itensVenda = null;
            this.itensVenda = itens;
            this.produtoService.mostrarMessagem('Comanda atualizada!', false);
        })
    }


    realizarPagamento() {

        let dialogRef = this.dialog.open(PagamentoComponent, {
            width: '550px',
            height: '650px',
            data: {id: this.id}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result == "SIM") {

            }
        });
    }
}


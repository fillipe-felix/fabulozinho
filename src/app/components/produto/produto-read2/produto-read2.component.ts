import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {ProdutoModel} from "../produto.model";
import {ProdutoService} from "../produto.service";


@Component({
    selector: 'app-produto-read2',
    templateUrl: './produto-read2.component.html',
    styleUrls: ['./produto-read2.component.css']
})
export class ProdutoRead2Component implements AfterViewInit, OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<ProdutoModel>;


    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = ['id', 'nome', 'preco', 'categoria', 'acoes'];
    EXAMPLE_DATA: ProdutoModel[]
    dataSource = new MatTableDataSource<ProdutoModel>(this.EXAMPLE_DATA);

    //data: ProdutoModel[] = EXAMPLE_DATA;

    constructor(private produtoService: ProdutoService) {
    }

    ngOnInit() {
        this.findAll();
    }

    public findAll() {
        this.produtoService.findAll().subscribe(produtos => this.dataSource.data = produtos as ProdutoModel[])
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
    }

}

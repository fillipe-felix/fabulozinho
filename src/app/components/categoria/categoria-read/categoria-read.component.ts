import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {CategoriaModel} from "../categoria.model";
import {CategoriaService} from "../categoria.service";

@Component({
    selector: 'app-categoria-read',
    templateUrl: './categoria-read.component.html',
    styleUrls: ['./categoria-read.component.css']
})
export class CategoriaReadComponent implements AfterViewInit, OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<CategoriaModel>;


    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = ['id', 'nome', 'acoes'];
    EXAMPLE_DATA: CategoriaModel[]
    dataSource = new MatTableDataSource<CategoriaModel>(this.EXAMPLE_DATA);

    constructor(private categoriaService: CategoriaService) {
    }

    ngOnInit() {
        this.findAll()
    }

    public findAll() {
        this.categoriaService.findAll().subscribe(categorias => this.dataSource.data = categorias as CategoriaModel[])
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
    }
}

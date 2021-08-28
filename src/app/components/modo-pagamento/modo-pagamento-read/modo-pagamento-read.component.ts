import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {ModoPagamentoService} from "../modo-pagamento.service";
import {ModoPagamentoModel} from "../modo-pagamento.model";
import {CategoriaModel} from "../../categoria/categoria.model";

@Component({
  selector: 'app-modo-pagamento-read',
  templateUrl: './modo-pagamento-read.component.html',
  styleUrls: ['./modo-pagamento-read.component.css']
})
export class ModoPagamentoReadComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ModoPagamentoModel>;


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  // displayedColumns = ['id', 'descricao','taxa','porcentagemDesconto','troco','aVista', 'acoes'];
  displayedColumns = ['id', 'descricao','porcentagemDesconto','aVista', 'acoes'];
  EXAMPLE_DATA: ModoPagamentoModel[]
  dataSource = new MatTableDataSource<ModoPagamentoModel>(this.EXAMPLE_DATA);

  constructor(private modoPagamentoService: ModoPagamentoService) {
  }

  ngOnInit() {
    this.findAll()
  }

  public findAll() {
    this.modoPagamentoService.findAll().subscribe(modosPagamentos => this.dataSource.data = modosPagamentos as ModoPagamentoModel[])
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

}

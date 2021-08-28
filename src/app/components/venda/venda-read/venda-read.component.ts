import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {VendaModel} from "../venda.model";
import {VendaService} from "../venda.service";

@Component({
  selector: 'app-venda-read',
  templateUrl: './venda-read.component.html',
  styleUrls: ['./venda-read.component.css']
})
export class VendaReadComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<VendaModel>;


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nomeComanda', 'subTotal', 'acoes'];
  EXAMPLE_DATA: VendaModel[]
  dataSource = new MatTableDataSource<VendaModel>(this.EXAMPLE_DATA);


  constructor(private vendaService: VendaService) {
  }

  ngOnInit() {
    this.findAll();
  }

  public findAll() {
    this.vendaService.findAll().subscribe(vendas => this.dataSource.data = vendas as VendaModel[])
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

}

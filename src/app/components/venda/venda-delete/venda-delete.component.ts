// import { Component, OnInit } from '@angular/core';
// import {PagamentoComponent} from "../../pagamento/pagamento.component";
// import {MatDialog} from "@angular/material/dialog";
// import {ActivatedRoute} from "@angular/router";
//
// @Component({
//   selector: 'app-venda-delete',
//   templateUrl: './venda-delete.component.html',
//   styleUrls: ['./venda-delete.component.css']
// })
// export class VendaDeleteComponent implements OnInit {
//
//   constructor(public dialog: MatDialog,private route: ActivatedRoute) { }
//   id: number;
//   private sub: any;
//
//   ngOnInit(): void {
//     this.sub = this.route.params.subscribe(params => {
//       this.id = +params['id']; // (+) converts string 'id' to a number
//     });
//     this.realizarCancelamento();
//   }
//
//
//   realizarCancelamento() {
//
//     let dialogRef = this.dialog.open(VendaDeleteComponent, {
//       width: '550px',
//       height: '650px',
//       data: {id: this.id}
//     });
//
//     dialogRef.afterClosed().subscribe(result => {
//       if (result == "SIM") {
//
//       }
//     });
//   }
// }

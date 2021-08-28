import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {VendaModel} from "./venda.model";
import {EMPTY, Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {ItemVendaModel} from "./itemVenda.model";
import {ProdutoModel} from "../produto/produto.model";

@Injectable({
    providedIn: 'root'
})
export class ItemVendaService {

    baseUrl = "http://localhost:8080/itemVenda"

    constructor(private snackBar: MatSnackBar,
                private http: HttpClient) {
    }

    mostrarMessagem(msg: string, isError: boolean = false): void {
        console.log(this.snackBar.open(msg, 'X', {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: isError ? ['msg-error'] : ['msg-sucess']
        }))
    }

    findAll(): Observable<VendaModel[]> {
        return this.http.get<VendaModel[]>(this.baseUrl).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    findByVendaId(id: number): Observable<ItemVendaModel[]> {
        const url = `${this.baseUrl}/venda/${id}`
        return this.http.get<ItemVendaModel>(url).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    ItemVendaModel(id: number): Observable<ItemVendaModel> {
        const url = `${this.baseUrl}/${id}`
        console.log("venda")
        console.log(url)
        return this.http.get<ItemVendaModel>(url).pipe(
            map(obj => this.ItemVendaModel),
            catchError(e => this.errorHandler(e))
        )
    }

    update(vendaModel: VendaModel): Observable<VendaModel> {
        const url = `${this.baseUrl}/${vendaModel.id}`
        return this.http.put<VendaModel>(url, vendaModel).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    delete(itemVendaId: number,vendaId: number): Observable<VendaModel> {
        const url = `${this.baseUrl}/${itemVendaId}/venda/${vendaId}`
        console.log("venda")
        console.log(url)
        return this.http.delete<VendaModel>(url).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    errorHandler(e: any): Observable<any> {
        this.mostrarMessagem('Ocorreu um erro!', true)
        return EMPTY
    }

    insertItensVenda(itensVenda: ItemVendaModel[]): Observable<ItemVendaModel[]> {
        console.log(this.baseUrl)
        console.log(itensVenda)
        return this.http.post<ProdutoModel>(this.baseUrl, itensVenda).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }
}

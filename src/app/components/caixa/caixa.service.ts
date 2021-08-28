import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {EMPTY, Observable} from "rxjs";
import {ProdutoModel} from "../produto/produto.model";
import {catchError, map} from "rxjs/operators";
import {CaixaModel} from "./caixa.model";

@Injectable({
    providedIn: 'root'
})
export class CaixaService {

    baseUrl = "http://localhost:8080/caixa"

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

    insert(caixa: CaixaModel): Observable<CaixaModel> {
        return this.http.post<CaixaModel>(this.baseUrl, caixa).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    findAll(): Observable<CaixaModel[]> {
        return this.http.get<CaixaModel[]>(this.baseUrl).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    findById(id: string): Observable<CaixaModel>{
        const url =`${this.baseUrl}/${id}`
        return this.http.get<CaixaModel>(url).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    update(caixa: CaixaModel): Observable<CaixaModel> {
        const url = `${this.baseUrl}/${caixa.id}`
        return this.http.put<CaixaModel>(url, caixa).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    delete(id: string): Observable<CaixaModel> {
        const url = `${this.baseUrl}/${'id'}`
        return this.http.delete<CaixaModel>(url).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    errorHandler(e: any): Observable<any> {
        this.mostrarMessagem('Ocorreu um erro!', true)
        return EMPTY
    }

    getCaixaFechar(): Observable<CaixaModel>{
        const url =`${this.baseUrl}/caixaFechamento`
        console.log(url)
        return this.http.get<CaixaModel>(url).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

}

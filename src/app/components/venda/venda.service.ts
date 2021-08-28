import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {VendaModel} from "./venda.model";
import {EMPTY, Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class VendaService {

    baseUrl = "http://localhost:8080/venda"

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

    insert(venda: VendaModel): Observable<VendaModel> {
        return this.http.post<VendaModel>(this.baseUrl, venda).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    findAll(): Observable<VendaModel[]> {
        return this.http.get<VendaModel[]>(this.baseUrl+"/emAberto").pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    findById(id: string): Observable<VendaModel>{
        const url =`${this.baseUrl}/${id}`
        return this.http.get<VendaModel>(url).pipe(
            map(obj => obj),
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

    delete(id: string): Observable<VendaModel> {
        const url = `${this.baseUrl}/${'id'}`
        return this.http.delete<VendaModel>(url).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    errorHandler(e: any): Observable<any> {
        this.mostrarMessagem('Ocorreu um erro!', true)
        return EMPTY
    }

    finalizaVenda(id: string): Observable<VendaModel> {
        const url = `${this.baseUrl}/finaliza/${id}`
        console.log(url)
        return this.http.put<VendaModel>(url,null).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }
}

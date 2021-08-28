import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {CategoriaModel} from "../categoria/categoria.model";
import {EMPTY, Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {PagamentoModel} from "./pagamento.model";
import {ModoPagamentoModel} from "../modo-pagamento/modo-pagamento.model";

@Injectable({
    providedIn: 'root'
})
export class PagamentoService {

    baseUrl = "http://localhost:8080/pagamento"

    constructor(private snackBar: MatSnackBar,
                private http: HttpClient) {
    }

    mostrarMessagem(msg: string, isError: boolean = false): void {
        console.log(this.snackBar.open(msg, 'X', {
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: isError ? ['msg-error'] : ['msg-sucess']
        }))
    }

    insert(pagamento: PagamentoModel): Observable<PagamentoModel> {
        return this.http.post<PagamentoModel>(this.baseUrl, pagamento).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    findAll(): Observable<PagamentoModel[]> {
        return this.http.get<PagamentoModel[]>(this.baseUrl).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    findById(id: string): Observable<PagamentoModel> {
        const url = `${this.baseUrl}/${id}`
        return this.http.get<PagamentoModel>(url).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    update(pagamento: PagamentoModel): Observable<PagamentoModel> {
        const url = `${this.baseUrl}/${pagamento.id}`
        console.log(pagamento)
        return this.http.put<PagamentoModel>(url, pagamento).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    delete(id: string): Observable<PagamentoModel> {
        const url = `${this.baseUrl}/${'id'}`
        return this.http.delete<PagamentoModel>(url).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    errorHandler(e: any): Observable<any> {
        this.mostrarMessagem('Ocorreu um erro!', true)
        return EMPTY
    }

    findByVendaId(vendaId) {
        const url = `${this.baseUrl}/vendaId/${vendaId}`
        return this.http.get<PagamentoModel>(url).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }
}

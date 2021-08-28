import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {CategoriaModel} from "../categoria/categoria.model";
import {EMPTY, Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {ModoPagamentoModel} from "./modo-pagamento.model";

@Injectable({
    providedIn: 'root'
})
export class ModoPagamentoService {

    baseUrl = "http://localhost:8080/modoPagamento"

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

    insert(modoPagamentoModel: ModoPagamentoModel): Observable<CategoriaModel> {
        return this.http.post<CategoriaModel>(this.baseUrl, modoPagamentoModel).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    findAll(): Observable<ModoPagamentoModel[]> {
        return this.http.get<ModoPagamentoModel[]>(this.baseUrl).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    findById(id: string): Observable<ModoPagamentoModel>{
        const url =`${this.baseUrl}/${id}`
        return this.http.get<ModoPagamentoModel>(url).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    update(modoPagamento: ModoPagamentoModel): Observable<ModoPagamentoModel> {
        const url = `${this.baseUrl}/${modoPagamento.id}`
        console.log(modoPagamento)
        return this.http.put<ModoPagamentoModel>(url, modoPagamento).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    delete(id: string): Observable<ModoPagamentoModel> {
        const url = `${this.baseUrl}/${'id'}`
        return this.http.delete<ModoPagamentoModel>(url).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    errorHandler(e: any): Observable<any> {
        this.mostrarMessagem('Ocorreu um erro!', true)
        return EMPTY
    }
}

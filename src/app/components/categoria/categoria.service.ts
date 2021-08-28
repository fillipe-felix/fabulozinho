import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {CategoriaModel} from "./categoria.model";
import {EMPTY, Observable} from "rxjs";
import {ProdutoModel} from "../produto/produto.model";
import {catchError, map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {

    baseUrl = "http://localhost:8080/categorias"

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

    insert(categoria: CategoriaModel): Observable<CategoriaModel> {
        return this.http.post<CategoriaModel>(this.baseUrl, categoria).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    findAll(): Observable<CategoriaModel[]> {
        return this.http.get<CategoriaModel[]>(this.baseUrl).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    findById(id: string): Observable<CategoriaModel>{
        const url =`${this.baseUrl}/${id}`
        return this.http.get<CategoriaModel>(url).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    update(categoria: CategoriaModel): Observable<CategoriaModel> {
        const url = `${this.baseUrl}/${categoria.id}`
        return this.http.put<CategoriaModel>(url, categoria).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    delete(id: string): Observable<CategoriaModel> {
        const url = `${this.baseUrl}/${'id'}`
        return this.http.delete<CategoriaModel>(url).pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    errorHandler(e: any): Observable<any> {
        this.mostrarMessagem('Ocorreu um erro!', true)
        return EMPTY
    }
}

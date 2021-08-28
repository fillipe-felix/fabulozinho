import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import {ProdutoModel} from "./produto.model";
import {EMPTY, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CategoriaModel} from "../categoria/categoria.model";
import {catchError, map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  baseUrl = "http://localhost:8080/produtos"

  constructor(private snackBar: MatSnackBar,
              private http: HttpClient) { }

  mostrarMessagem(msg: string, isError: boolean = false): void {
    console.log(this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-sucess']
    }))
  }

  insert(produto: ProdutoModel): Observable<ProdutoModel> {
    return this.http.post<ProdutoModel>(this.baseUrl, produto).pipe(
        map(obj => obj),
        catchError(e => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    this.mostrarMessagem('Ocorreu um erro!', true)
    return EMPTY
  }

  findAll(): Observable<ProdutoModel[]> {
    return this.http.get<ProdutoModel[]>(this.baseUrl).pipe(
        map(obj => obj),
        catchError(e => this.errorHandler(e))
    )
  }

  findById(id: string): Observable<ProdutoModel>{
    const url =`${this.baseUrl}/${id}`
    return this.http.get<ProdutoModel>(url).pipe(
        map(obj => obj),
        catchError(e => this.errorHandler(e))
    )
  }

  update(produto: ProdutoModel): Observable<ProdutoModel>{
    const url =`${this.baseUrl}/${produto.id}`
    return this.http.put<ProdutoModel>(url, produto).pipe(
        map(obj => obj),
        catchError(e => this.errorHandler(e))
    )
  }

  delete(id: string): Observable<ProdutoModel>{
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<ProdutoModel>(url).pipe(
        map(obj => obj),
        catchError(e => this.errorHandler(e))
    )
  }
}

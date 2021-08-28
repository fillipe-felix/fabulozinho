import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import {VendaModel} from "../venda.model";

// TODO: Replace this with your own data model type
/*export interface ProdutoModel {
  name: string;
  id: number;
}*/

// TODO: replace this with real data from your application
//{id: 1, nome: 'Hydrogen', preco: 10, categoria: { nome: 'teste'}},
const EXAMPLE_DATA: VendaModel[] = [
    // {id: 1, nome: 'Hydrogen', preco: 10, categoria: { nome: 'teste'}},
    // {id: 2, nome: 'Helium', preco: 10, categoria: { nome: 'teste'}},
    // {id: 3, nome: 'Lithium', preco: 10, categoria: { nome: 'teste'}},
    // {id: 4, nome: 'Beryllium', preco: 10, categoria: { nome: 'teste'}},
    // {id: 5, nome: 'Boron', preco: 10, categoria: { nome: 'teste'}},
    // {id: 6, nome: 'Carbon', preco: 2, categoria: { nome: 'teste'}},
    // {id: 7, nome: 'Nitrogen', preco: 10, categoria: { nome: 'teste'}},
    // {id: 8, nome: 'Oxygen', preco: 10, categoria: { nome: 'teste'}},
    // {id: 9, nome: 'Fluorine', preco: 8, categoria: { nome: 'teste'}},
    // {id: 10, nome: 'Neon', preco: 10, categoria: { nome: 'teste'}},
    // {id: 11, nome: 'Sodium', preco: 10, categoria: { nome: 'teste'}},
    // {id: 12, nome: 'Magnesium', preco: 9, categoria: { nome: 'teste'}},
    // {id: 13, nome: 'Aluminum', preco: 10, categoria: { nome: 'teste'}},
    // {id: 14, nome: 'Silicon', preco: 10, categoria: { nome: 'teste'}},
    // {id: 15, nome: 'Phosphorus', preco: 10, categoria: { nome: 'teste'}},
    // {id: 16, nome: 'Sulfur', preco: 10, categoria: { nome: 'teste'}},
    // {id: 17, nome: 'Chlorine', preco: 10, categoria: { nome: 'teste'}},
    // {id: 18, nome: 'Argon', preco: 10, categoria: { nome: 'teste'}},
    // {id: 19, nome: 'Potassium', preco: 10, categoria: { nome: 'teste'}},
    // {id: 20, nome: 'Calcium', preco: 1, categoria: { nome: 'teste'}},
];

/**
 * Data source for the ProdutoModel view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class VendaReadDataSource extends DataSource<VendaModel> {
    data: VendaModel[] = EXAMPLE_DATA;
    paginator: MatPaginator;
    sort: MatSort;

    constructor() {
        super();
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<VendaModel[]> {
        // Combine everything that affects the rendered data into one update
        // stream for the data-table to consume.
        const dataMutations = [
            observableOf(this.data),
            this.paginator.page,
            this.sort.sortChange
        ];

        return merge(...dataMutations).pipe(map(() => {
            return this.getPagedData(this.getSortedData([...this.data]));
        }));
    }

    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect() {}

    /**
     * Paginate the data (client-side). If you're using server-side pagination,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getPagedData(data: VendaModel[]) {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
    }

    /**
     * Sort the data (client-side). If you're using server-side sorting,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getSortedData(data: VendaModel[]) {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'nomeComanda': return compare(a.nomeComanda, b.nomeComanda, isAsc);
                case 'id': return compare(+a.id, +b.id, isAsc);
                case 'subTotal': return compare(a.subTotal, b.subTotal, isAsc);
                default: return 0;
            }
        });
    }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

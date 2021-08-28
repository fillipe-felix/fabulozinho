import { Injectable } from '@angular/core';
import {HeaderDataModel} from "./header-data.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _headerData = new BehaviorSubject<HeaderDataModel>({
    titulo: 'Início',
    icone: 'home',
    routeUrl: ''
  })

  constructor() { }

  get headerData(): HeaderDataModel {
    return this._headerData.value
  }

  set headerData(headerDataModel: HeaderDataModel){
    this._headerData.next(headerDataModel)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColumnState } from 'ag-grid-community/dist/lib/columnController/columnController';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  public columnState: ColumnState[] = [];
  public sortModel: any[];
  public filterModel: any[];
  public pivot: boolean;

  constructor(private httpClient: HttpClient) {
  }

  getOlympicWinners() {
    return this.httpClient.get<any[]>(
      'https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json'
    );
  }


}

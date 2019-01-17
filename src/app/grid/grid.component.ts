import { Component, OnInit, ViewChild } from '@angular/core';
import { GridService } from '../grid.service';
import { GridOptions } from 'ag-grid-community';
import { AgGridNg2 } from 'ag-grid-angular';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  title = 'ag-state-poc';
  gridOptions: GridOptions;
  rowData: any[];
  @ViewChild('agGrid') agGrid: AgGridNg2;

  constructor(private gridService: GridService) {}

  ngOnInit(): void {
    this.gridOptions = {
      // define grid columns
      columnDefs: [
        // using default ColDef
        {headerName: 'Athlete', field: 'athlete', enableRowGroup: true, enableValue: true, enablePivot: true},
        {headerName: 'Sport', field: 'sport', enableRowGroup: true, enableValue: true, enablePivot: true},

        // using number column type
        {headerName: 'Age', field: 'age', type: 'numberColumn', enableRowGroup: true, enableValue: true, enablePivot: true},
        {headerName: 'Year', field: 'year', type: 'numberColumn', enableRowGroup: true, enableValue: true, enablePivot: true},

        // using date and non-editable column types
        {headerName: 'Date', field: 'date', type: ['dateColumn', 'nonEditableColumn'],
          width: 200, enableRowGroup: true, enableValue: true, enablePivot: true},
        {
          headerName: 'Medals',
          groupId: 'medalsGroup',
          children: [
            // using medal column type
            {headerName: 'Gold', field: 'gold', type: 'medalColumn'},
            {headerName: 'Silver', field: 'silver', type: 'medalColumn'},
            {headerName: 'Bronze', field: 'bronze', type: 'medalColumn'}
          ]
        }
      ],

      // default ColDef, gets applied to every column
      defaultColDef: {
        // set the default column width
        width: 150,
        // make every column editable
        editable: true,
        // make every column use 'text' filter by default
        filter: 'agTextColumnFilter'
      },

      // default ColGroupDef, get applied to every column group
      // defaultColGroupDef: {
      //   marryChildren: true
      // },

      // define specific column types
      columnTypes: {
        numberColumn: {width: 83, filter: 'agNumberColumnFilter'},
        medalColumn: {width: 100, columnGroupShow: 'open', suppressFilter: true},
        nonEditableColumn: {editable: false},
        dateColumn: {
          // specify we want to use the date filter
          filter: 'agDateColumnFilter',

          // add extra parameters for the date filter
          filterParams: {
            // provide comparator function
            comparator: function(filterLocalDateAtMidnight, cellValue) {
              // In the example application, dates are stored as dd/mm/yyyy
              // We create a Date object for comparison against the filter date
              const dateParts = cellValue.split('/');
              const day = Number(dateParts[2]);
              const month = Number(dateParts[1]) - 1;
              const year = Number(dateParts[0]);
              const cellDate = new Date(day, month, year);

              // Now that both parameters are Date objects, we can compare
              if (cellDate < filterLocalDateAtMidnight) {
                return -1;
              } else if (cellDate > filterLocalDateAtMidnight) {
                return 1;
              } else {
                return 0;
              }
            }
          }
        }
      },

      rowData: null,
      enableFilter: true,
      enableSorting: true,
      floatingFilter: true,
      sideBar: true,
    };
  }

  loadData() {
    this.gridService.getOlympicWinners().subscribe(data => {
      this.rowData = data;
    });
  }

  getColumnState() {
    console.log(this.agGrid.columnApi.getColumnState());
  }

  saveColumnState() {
    this.gridService.columnState = this.agGrid.columnApi.getColumnState();
  }

  restoreColumnState() {
    this.agGrid.columnApi.setColumnState(this.gridService.columnState);
  }

  savePivot() {
    this.gridService.pivot = this.agGrid.columnApi.isPivotMode();
  }

  restorePivot() {
    this.agGrid.columnApi.setPivotMode(this.gridService.pivot);
  }

  saveFilterModel() {
    this.gridService.filterModel = this.agGrid.api.getFilterModel();
  }

  restoreFilterModel() {
    this.agGrid.api.setFilterModel(this.gridService.filterModel);
  }

  resetColumnState() {
    this.gridService.columnState = [];
  }

  saveSortModel() {
    this.gridService.sortModel = this.agGrid.api.getSortModel();
  }

  restoreSortModel() {
    this.agGrid.api.setSortModel(this.gridService.sortModel);
  }

  saveAll() {
    this.savePivot();
    this.saveColumnState();
    this.saveFilterModel();
    this.saveSortModel();
  }

  restoreAll() {
    this.restorePivot();
    this.restoreColumnState();
    this.restoreFilterModel();
    this.restoreSortModel();
  }

  getColumnDefs() {
    console.log(this.agGrid.columnApi.getAllColumns().map(column => column.getColDef()));
  }
}

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() select = new EventEmitter();
  @Output() remove = new EventEmitter();

  @Input() title:string = '';
  @Input() columns:ColumnItem[] = [];
  @Input() items: Observable<unknown[]> = of([]);

  displayedColumns: string[] = [];
  dataSource!:MatTableDataSource<unknown>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  selected: unknown;

  ngOnInit(): void {
    this.items.subscribe(items => {
      this.dataSource = new MatTableDataSource<unknown>(items);
      this.dataSource.paginator = this.paginator;
    })
    this.displayedColumns = this.columns.map(({ value }) => value);
  }

  selectRow(row: unknown) {
    this.selected = this.selected !== row ? row : null;
    this.select.emit(this.selected);
  }
  addRow() { this.add.emit(); }
  editRow() { this.edit.emit(this.selected); }
  removeRow() { this.remove.emit(this.selected); }
}

export interface ColumnItem {
  name: string;
  value: string;
}

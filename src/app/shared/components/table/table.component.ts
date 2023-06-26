import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { UnsubscribeComponent } from '@root/app/utils/unsubscribe';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends UnsubscribeComponent implements OnInit, AfterViewInit {
  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() selectItem = new EventEmitter();
  @Output() remove = new EventEmitter();

  @Input() title = '';
  @Input() columns:ColumnItem[] = [];

  @Input() items: Observable<unknown[]> = of([]);

  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource();

  selected: unknown;

  ngOnInit(): void {
    this.subs.add(this.fetch());
    this.displayedColumns = this.columns.map(({ value }) => value);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  selectRow(row: unknown): void {
    this.selected = this.selected !== row ? row : null;
    this.selectItem.emit(this.selected);
  }
  addRow(): void { this.add.emit(); }
  editRow(): void { this.edit.emit(this.selected); }
  removeRow(): void { this.remove.emit(this.selected); }

  private fetch() {
    return this.items.subscribe(items => {
      this.dataSource.data = items;
    })
  }
}

export interface ColumnItem {
  name: string;
  value: string;
}

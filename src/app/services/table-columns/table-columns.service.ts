import { Injectable } from '@angular/core';
import { FieldType } from '@root/app/shared/components/form/protocols/field-type';
import { ColumnItem } from '@root/app/shared/components/table/table.component';

type ColumnItemInput = {
  name: string;
  value?: string;
  type?: FieldType;
  labelName?: string;
};

@Injectable({
  providedIn: 'root'
})
export class TableColumnsService {

  private columns: ColumnItem[] = [];

  addItem(item: ColumnItemInput): TableColumnsService {
    const column: ColumnItem = {
      name: item.name as string,
      value: item.value ?? item.name?.toLocaleLowerCase(),
      type: item.type ?? FieldType.input,
      labelName: item.labelName ?? item.name,
    }
    this.columns.push(column);
    return this;
  }

  build (): ColumnItem[] {
    const columns = [...this.columns]
    this.columns = [];
    return columns;
  }
}

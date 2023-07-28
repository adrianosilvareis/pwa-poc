import { TestBed } from '@angular/core/testing';

import { TableColumnsService } from './table-columns.service';
import { FieldType } from '@root/app/shared/components/form/protocols/field-type';

describe('TableColumnsService', () => {
  let service: TableColumnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableColumnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should build a table configuration correctly', () => {
    const config = service
      .addItem({ name: 'Name' })
      .addItem({ name: 'Service', type: FieldType.autocomplete })
      .addItem({ name: 'IsActive', value: "is_active", type: FieldType.YesNo })
      .addItem({ name: 'Price', type: FieldType.currency })
      .addItem({ name: 'EndDate', value: "end_date",type: FieldType.date })
      .addItem({ name: 'Contracts', type: FieldType.multiselect })
      .build();

    expect(config).toEqual([
        { "labelName": "Name", "name": "Name", "type": "input", "value": "name" },
        { "labelName": "Service", "name": "Service", "type": "autocomplete", "value": "service" },
        { "labelName": "IsActive", "name": "IsActive", "type": "YesNo", "value": "is_active" },
        { "labelName": "Price", "name": "Price", "type": "currency", "value": "price" },
        { "labelName": "EndDate", "name": "EndDate", "type": "date", "value": "end_date" },
        { "labelName": "Contracts", "name": "Contracts", "type": "multiselect", "value": "contracts" },
      ]);
  });
});

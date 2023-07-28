import { fireEvent, render, screen } from '@testing-library/angular';
import { MaterialModule } from '@app/material/material.module';
import { ColumnItem, TableComponent } from './table.component';
import { Observable, of } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { FieldType } from '@components/form/protocols/field-type';
import { SharedModule } from '@app/shared/shared.module';

describe('TableComponent', () => {
  const title = 'title';
  const columns: ColumnItem[] = [{ value: 'name', name: 'Name', type: FieldType.input }];
  const items: Observable<unknown[]> = of([{ name: 'ITEM_NAME' }]);

  it('should render a row with correct values', async () => {
    // given
    await setup(title, columns, items);

    // when
    const cell = screen.getByRole('cell');
    const header = screen.getByRole('columnheader');

    // then
    expect(cell.textContent).toBe('ITEM_NAME');
    expect(header.textContent).toBe('Name');
    expect(cell.classList.contains('cdk-column-name')).toBeTruthy();
  });

  it('should style line when click on it', async () => {
    // given
    await setup(title, columns, items);

    // when
    const cell = screen.getByRole('cell');

    // then
    expect(screen.getAllByRole('row').at(1)?.classList.contains('demo-row-is-clicked')).toBeFalsy();
    fireEvent.click(cell);
    expect(screen.getAllByRole('row').at(1)?.classList.contains('demo-row-is-clicked')).toBeTruthy();
  });

  it('should has paginator', async () => {
    // given
    await setup(title, columns, items);

    // when
    const combobox = screen.getByRole('combobox');

    // then
    expect(combobox.getAttribute('ng-reflect-value')).toBe("5");
  });

  it('should call events when click on it', async () => {
    // given
    const addSpy = jest.fn();
    const editSpy = jest.fn();
    const removeSpy = jest.fn();
    const selectSpy = jest.fn();

    const handlers = {
      addSpy: setupEventEmitter(addSpy),
      editSpy: setupEventEmitter(editSpy),
      removeSpy: setupEventEmitter(removeSpy),
      selectSpy: setupEventEmitter(selectSpy),
    }
    await setup(title, columns, items, handlers);

    // when
    const select = screen.getByRole('cell');
    fireEvent.click(select);

    const addButton = screen.getByText('add_circle');
    fireEvent.click(addButton);

    const editButton = screen.getByText('edit');
    fireEvent.click(editButton);

    const removeButton = screen.getByText('delete');
    fireEvent.click(removeButton);

    // then
    expect(addSpy).toHaveBeenCalled();
    expect(editSpy).toHaveBeenCalledWith({"name": "ITEM_NAME"});
    expect(removeSpy).toHaveBeenCalledWith({"name": "ITEM_NAME"});
    expect(selectSpy).toHaveBeenCalledWith({"name": "ITEM_NAME"});

    fireEvent.click(select);
    expect(selectSpy).toHaveBeenCalledWith(null);
  });
});

type Handlers = {
  addSpy: EventEmitter<unknown>,
  editSpy: EventEmitter<unknown>,
  removeSpy: EventEmitter<unknown>,
  selectSpy: EventEmitter<unknown>
}
async function setup(title: string, columns: ColumnItem[], items: Observable<unknown[]>, handlers?: Handlers) {
  return render(TableComponent, {
    imports: [MaterialModule, SharedModule],
    componentProperties: { title, columns, items },
    componentOutputs: {
      add: handlers?.addSpy ?? new EventEmitter(),
      edit: handlers?.editSpy ?? new EventEmitter(),
      remove: handlers?.removeSpy ?? new EventEmitter(),
      selectItem: handlers?.selectSpy ?? new EventEmitter()
    }
  });
}

function setupEventEmitter(handler: (value?: unknown) => void) {
  const event = new EventEmitter();
  event.emit = handler;

  return event;
}

import { fireEvent, render, screen } from '@testing-library/angular';
import { MaterialModule } from '@app/material/material.module';
import { TableComponent } from './table.component';
import { of } from 'rxjs';
import { EventEmitter } from '@angular/core';

describe('TableComponent', () => {
  const title = 'title';
  const columns = [{ value: 'name', name: 'Name' }];
  const items = of([{ name: 'ITEM_NAME' }]);

  it('should render a row with correct values', async () => {
    // given
    await render(TableComponent, {
      imports:[MaterialModule],
      componentProperties: { title, columns, items }
    });
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
    await render(TableComponent, {
      imports:[MaterialModule],
      componentProperties: { title, columns, items }
    });

    // when
    const cell = screen.getByRole('cell');

    // then
    expect(screen.getAllByRole('row').at(1)?.classList.contains('demo-row-is-clicked')).toBeFalsy();
    fireEvent.click(cell);
    expect(screen.getAllByRole('row').at(1)?.classList.contains('demo-row-is-clicked')).toBeTruthy();
  });

  it('should has paginator', async () => {
    await render(TableComponent, {
      imports:[MaterialModule]
    });

    const combobox = screen.getByRole('combobox');

    expect(combobox.getAttribute('ng-reflect-value')).toBe("5");
  });

  it('should call events when click on it', async () => {
    // given
    const addSpy = jest.fn();
    const editSpy = jest.fn();
    const removeSpy = jest.fn();
    const selectSpy = jest.fn();

    const addEvent = new EventEmitter();
    addEvent.emit = addSpy;

    const editEvent = new EventEmitter();
    editEvent.emit = editSpy;

    const removeEvent = new EventEmitter();
    removeEvent.emit = removeSpy;

    const selectEvent = new EventEmitter();
    selectEvent.emit = selectSpy;

    await render(TableComponent, {
      imports:[MaterialModule],
      componentInputs: { title, columns, items },
      componentOutputs: {
        add: addEvent,
        edit: editEvent,
        remove: removeEvent,
        select: selectEvent
      }
    });

    // when
    const cell = screen.getByRole('cell');
    fireEvent.click(cell);

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

    fireEvent.click(cell);
    expect(selectSpy).toHaveBeenCalledWith(null);
  });
});


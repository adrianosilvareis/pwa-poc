import { MultiSelectFormComponent } from './multi-select-form.component';
import { FormGroup, FormControl } from '@angular/forms';
import { waitFor, render, screen } from '@testing-library/angular';
import { FormModule } from '../form.module';
import { MaterialModule } from '@root/app/material/material.module';

describe('MultiSelectFormComponent', () => {
  it('should render label with correct value', async () => {
    await setup();
    const label = screen.getByText('Label');
    expect(label.textContent).toBe('Label');
  });

  it('should set value when click any option', async () => {
    const { component } = await setup();
    await selectOptions();
    expect(component.fixture.componentInstance.control.value).toEqual(['one']);
  });

  it('should clear value when click clearable button', async () => {
    const { component } = await setup();

    component.fixture.componentInstance.toggleAll();
    component.fixture.componentInstance.toggleAll();

    expect(component.fixture.componentInstance.control.value).toEqual([]);
  });

  it('should change value when click in another option', async () => {
    const { component } = await setup();
    await selectOptions();

    await waitFor(() => {
      const options = screen.getAllByRole('options');
      options.at(1)?.click();
      expect(component.fixture.componentInstance.control.value).toEqual(['one', 'two']);
    });
  });
});


async function selectOptions(optionNumber = 0) {
  const select = screen.getByRole('multiselect') as HTMLSelectElement;
  select.click();
  await waitFor(() => {
    const options = screen.getAllByRole('options');
    options.at(optionNumber)?.click();
  })

  const selectAll = screen.getByRole('selectAll') as HTMLInputElement;

  return {
    select,
    selectAll
  }
}

async function setup() {
  const group = new FormGroup({
    field: new FormControl('')
  });
  const component = await render(MultiSelectFormComponent, {
    imports: [FormModule, MaterialModule],
    componentInputs: {
      inputKey: 'field',
      group: group,
      label: 'label',
      placeholder: 'placeholder',
      clearable: true,
      options: [{ label: 'one', value: 'one' }, { label: 'two', value: 'two' }, { label: 'three', value: 'three' }]
    }
  })

  return {
    component,
    group
  }
}

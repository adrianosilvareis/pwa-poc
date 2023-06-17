import { DatepickFormComponent } from './datepick-form.component';
import { FormControl, FormGroup } from '@angular/forms';
import { FormModule } from '../form.module';
import { render, screen } from '@testing-library/angular';

describe('DatepickFormComponent', () => {
  it('should render label with correct value', async () => {
    await setup();
    const label = screen.getByText('Label');
    expect(label.textContent).toBe('Label');
  });

  it('should clear value when click clearable button', async () => {
    await setup();
    const input = screen.getByRole('input') as HTMLInputElement;

    input.value = '2021-01-01';

    screen.getByRole('clearable').click();
    expect(input.value).toBe('')
  });
});


async function setup() {
  const group = new FormGroup({
    field: new FormControl('')
  });
  await render(DatepickFormComponent, {
    imports: [FormModule],
    componentInputs: {
      inputKey: 'field',
      group: group,
      label: 'label',
      placeholder: 'placeholder',
      clearable: true,
    }
  })

  return {
    group
  }
}

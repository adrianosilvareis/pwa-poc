import { CheckboxFormComponent } from './checkbox-form.component';
import { fireEvent, render, screen } from '@testing-library/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { FormModule } from '../form.module';

describe('CheckboxFormComponent', () => {
  it('should has a truthy value', async () => {
    await setup();

    const checkbox = screen.getByRole('switch') as HTMLButtonElement;

    expect(checkbox.getAttribute('aria-checked')).toBe('false');
  });

  it('should toggle value when clicked', async () => {
    await setup();

    const checkbox = screen.getByRole('switch') as HTMLButtonElement;

    fireEvent.click(checkbox);

    expect(checkbox.getAttribute('aria-checked')).toBe('true');

  });
});

async function setup() {
  const formGroup = new FormGroup({
    field: new FormControl(false)
  });
  await render(CheckboxFormComponent, {
    imports: [FormModule],
    componentInputs: {
      group: formGroup,
      inputKey: 'field',
      label: 'field'
    }
  })

  return {
    formGroup
  }
}

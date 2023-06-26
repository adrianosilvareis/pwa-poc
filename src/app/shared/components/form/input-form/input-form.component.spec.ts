import { InputFormComponent } from './input-form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormModule } from '../form.module';
import { render, screen } from '@testing-library/angular';

describe('InputFormComponent', () => {
  it('should render label with correct value', async () => {
    await setup();
    const label = screen.getByText('Label');
    expect(label.textContent).toBe('Label');
  });

  it('should clear value when click clearable button', async () => {
    await setup();
    const input = screen.getByRole('input') as HTMLInputElement;

    input.value = 'any_value';
    screen.getByRole('clearable').click();

    expect(input.value).toBe('')
  });

  it('should show validation message when field is invalid', async () => {
    const { group } = await setup();
    group.get('field')?.addValidators(Validators.required);

    const input = screen.getByRole('input') as HTMLInputElement;

    input.value = 'any_value';
    screen.getByRole('clearable').click();

    expect(group.valid).toBeFalsy()
    expect(group.controls.field.errors).toEqual({"required": true})
  });
});


async function setup() {
  const group = new FormGroup({
    field: new FormControl('')
  });
  const component = await render(InputFormComponent, {
    imports: [FormModule],
    componentInputs: {
      inputKey: 'field',
      group: group,
      label: 'label',
      placeholder: 'placeholder',
      clearable: true
    }
  })

  return {
    component,
    group
  }
}

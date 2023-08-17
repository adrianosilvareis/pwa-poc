import { MaterialModule } from '@root/app/material/material.module';
import { render, screen } from '@testing-library/angular';
import { NumberFormComponent } from './number-form.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@root/app/shared/shared.module';

describe('NumberFormComponent', () => {
  it('should provide number value to control and formatted value to input value', async () => {
    const component = await setup();
    const input = screen.getByRole('input') as HTMLInputElement;
    input.value = '12.34';

    input.dispatchEvent(new Event('input'));

    expect(input.value).toBe('12.34');
    expect(component.fixture.componentInstance.control.value).toBe(12.34);
  });
});

async function setup() {
  const group = new FormGroup({
    price: new FormControl(null)
  });

  return await render(NumberFormComponent, {
    imports: [SharedModule, MaterialModule, ReactiveFormsModule],
    componentInputs: {
      inputKey: 'price',
      group: group,
      label: 'price',
      placeholder: '0.00',
      clearable: true,
    }
  });
}

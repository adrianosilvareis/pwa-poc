import { render, screen, waitFor } from "@testing-library/angular";
import { AutocompleteFormComponent } from "./autocomplete-form.component";
import { FormModule } from "../form.module";
import { FormControl, FormGroup } from "@angular/forms";

describe('AutocompleteFormComponent', () => {
  it('should render label with correct value', async () => {
    await setup();
    const label = screen.getByText('label');
    expect(label.textContent).toBe('label');
  });

  it('should set value when click any option', async () => {
    await setup();
    const { input } = selectOptions()

    expect(input.value).toBe('one')
  });

  it('should clear value when click clearable button', async () => {
    await setup();
    const { input } = selectOptions()

    screen.getByRole('clearable').click();
    expect(input.value).toBe('')
  });

  it('should mark options with check when is selected', async () => {
    await setup();
    const { input } = selectOptions()

    screen.getByRole('clearable').click();
    expect(input.value).toBe('')
  });

  it('should change value when click in another option', async () => {
    await setup();
    const { input } = selectOptions();

    expect(input.value).toBe('one');

    screen.getByRole('clearable').click();

    input.value = ''
    input.click();
    await waitFor(() => {
      const options = screen.getAllByRole('options')
      options.at(1)?.click();
      expect(input.value).toBe('two');
    });
  });

  it('should filter options list when text any input', async () => {
    await setup();
    const { input } = selectOptions();

    expect(input.value).toBe('one');
    input.click();

    await waitFor(() => {
      const options = screen.getAllByRole('options');
      expect(options).toHaveLength(1);
      expect(options.at(0)?.textContent).toContain('one')
    });
  });

  it('should update group value when select any options', async () => {
    const { group } = await setup();
    selectOptions();

    expect(group.value).toEqual({ field: 'one' });
  });
});


function selectOptions(optionNumber = 0) {
  const input = screen.getByLabelText('label') as HTMLInputElement;
    input.click();

  const options = screen.getAllByRole('options')
  options.at(optionNumber)?.click();

  return {
    input,
    options
  }
}

async function setup() {
  const group = new FormGroup({
    field: new FormControl('')
  });
  await render(AutocompleteFormComponent, {
    imports: [FormModule],
    componentInputs: {
      inputKey: 'field',
      group: group,
      label: 'label',
      placeholder: 'placeholder',
      clearable: true,
      options: ['one', 'two', 'three']
    }
  })

  return {
    group
  }
}

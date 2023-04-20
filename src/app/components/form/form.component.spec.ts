import { FormComponent } from './form.component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { fireEvent, render, screen } from '@testing-library/angular';
import { SharedModule } from '@components/shared.module';
import { FormItems } from './items.model';
import { EventEmitter } from '@angular/core';

describe('FormComponent', () => {
  const data = [
    { colspan: 2, name: 'name', placeholder: 'Name', label: 'Name', value: ['', Validators.required] },
  ];

  it('should render title and id when exist', async () => {
    // given
    const { title, formId } = await setup(data);

    // then
    expect(title.textContent).toBe('My_title');
    expect(formId.textContent).toBe('Id# MY_ID');
  });

  it('should render fields based on data', async () => {
    // given
    const { input } = await setup(data);

    // then
    expect(input.getAttribute('placeholder')).toBe('Name');
    expect(input.getAttribute('ng-reflect-name')).toBe('name');
    expect(input.hasAttribute('required')).toBeTruthy();
  });

  it('should fiel FormGroup when form is filled', async () => {
    // given
    const { event, handler } = setupEventEmitter();
    const { input, saveButton } = await setup(data, event);

    // when
    fireEvent.input(input, {target: {value: 'MY_VALUE'}});
    saveButton.click();

    // then
    expect(handler).toHaveBeenCalledWith({ name: 'MY_VALUE' });
  });

  it('should not call save event if form is invalid', async () => {
    // given
    const { event, handler } = setupEventEmitter();
    const { input, saveButton } = await setup(data, event);

    // when
    saveButton.click();

    // then
    expect(handler).toHaveBeenCalledTimes(0);
  });

  it('should call event when click on cancel', async () => {
    // given
    const { event, handler } = setupEventEmitter();
    const { cancelButton } = await setup(data, event);

    // when
    fireEvent.click(cancelButton);

    // then
    expect(handler).toHaveBeenCalledWith();
  });
});

function setupEventEmitter() {
  const handler = jest.fn();

  const event = new EventEmitter();
  event.emit = handler
  return {
    event,
    handler
  }
}

async function setup(data: FormItems[], handler?: EventEmitter<unknown>) {
  await render(FormComponent, {
    imports: [SharedModule, ReactiveFormsModule],
    componentInputs: {
      title: 'MY_TITLE',
      formId: 'MY_ID',
      data: data
    },
    componentOutputs: {
      save: handler,
      cancel: handler,
    }
  });

  const title = screen.getByRole('title');
  const formId = screen.getByRole('formId');
  const input = screen.getByLabelText('Name');
  const saveButton = screen.getByRole('save');
  const cancelButton = screen.getByRole('cancel');

  return {
    title,
    formId,
    input,
    saveButton,
    cancelButton
  }
}

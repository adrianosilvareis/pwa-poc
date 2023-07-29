import { FormComponent } from './edit-form.component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { fireEvent, render, screen } from '@testing-library/angular';
import { EventEmitter } from '@angular/core';
import { FormItems } from "../protocols/form-item";
import { FormModule } from '../form.module';
import { FormItemsBuilder as Builder } from '@root/app/services/form-items/form-items.builder';

describe('FormComponent', () => {
    const data = new Builder()
                            .addItem({ name: 'name', value: '', colspan: 2 })
                            .addValidations([Validators.required])
                            .build();

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
    expect(input?.getAttribute('placeholder')).toBe('Name');
    expect(input?.hasAttribute('ng-reflect-form')).toBeTruthy();
    expect(input?.hasAttribute('required')).toBeTruthy();
  });

  it('should fiel FormGroup when form is filled', async () => {
    // given
    const { event, handler } = setupEventEmitter();
    const { input, saveButton } = await setup(data, event);

    // when
    fireEvent.input(input as HTMLElement, {target: {value: 'MY_VALUE'}});
    saveButton.click();

    // then
    expect(handler).toHaveBeenCalledWith({ name: 'MY_VALUE' });
  });

  it('should not call save event if form is invalid', async () => {
    // given
    const { event, handler } = setupEventEmitter();
    const { input, saveButton } = await setup(data, event);

    fireEvent.input(input as HTMLElement, {target: {value: null }});
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

  it('should invalidate form when formGroup not provided', async () => {
    // given
    const { event, handler } = setupEventEmitter();
    const { saveButton } = await setup([], event);

    // when
    saveButton.click();

    // then
    expect(saveButton.getAttribute('disabled')).toBeTruthy();
    expect(handler).toHaveBeenCalledTimes(0);
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
    imports: [FormModule, ReactiveFormsModule],
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

  const input = data.length ? screen.getByLabelText('Name') : null;
  const saveButton = screen.getByRole('save');
  const title = screen.getByRole('title');
  const formId = screen.getByRole('formId');
  const cancelButton = screen.getByRole('cancel');

  return {
    title,
    formId,
    input,
    saveButton,
    cancelButton
  }
}


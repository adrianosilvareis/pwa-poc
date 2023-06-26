import { FieldType, FormItems } from '@root/app/shared/components/form/items.model';
import { FormItemsBuilderService } from './form-items-builder.service';
import { FormControl, Validators } from '@angular/forms';

describe('FormItemsBuilderService', () => {
  const items = [
    {
      colspan: 1,
      name: "name",
      placeholder: "Name",
      label: "Name",
      value: [''],
      type: FieldType.input,
    },
    {
      colspan: 1,
      name: "description",
      placeholder: "Description",
      label: "Description",
      value: [''],
      type: FieldType.input,
    },
  ]
  it('should be created a FormItems', () => {
    // given
    const builder = new FormItemsBuilderService();

    // when
    const itens = builder
                    .addItem({ name: 'name', value: '' })
                    .addItem({ name: 'description', value: '' })
                    .build();

    // then
    expect(itens).toEqual(items);
  });

  it('should be created a FormItems with validations', () => {
    // given
    const validations = [Validators.required];
    const builder = new FormItemsBuilderService();
    const validateNameItem = items.at(0);
    const validateDescriptionItem = { ...items.at(1), value: new FormControl('', validations) };

    // when
    const buildedItems = builder
                            .addItem({ name: 'name', value: '' })
                            .addItem({ name: 'description', value: '' }).addValidations(validations)
                            .build();

    const builderNameItem = buildedItems.at(0) as FormItems;
    const builderDescriptionItem = buildedItems.at(1) as FormItems;

    // then
    expect(JSON.stringify(builderNameItem)).toEqual(JSON.stringify(validateNameItem));
    expect(JSON.stringify(builderDescriptionItem)).toEqual(JSON.stringify(validateDescriptionItem));
  });
});

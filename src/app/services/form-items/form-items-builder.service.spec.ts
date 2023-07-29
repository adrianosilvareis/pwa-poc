import { FieldType } from '@root/app/shared/components/form/protocols/field-type';
import { FormItems } from "@root/app/shared/components/form/protocols/form-item";
import { FormItemsBuilderService } from './form-items-builder.service';
import { FormControl, Validators } from '@angular/forms';

describe('FormItemsBuilderService', () => {
  const items: FormItems[] = [
    { colspan: 1, name: "name", placeholder: "Name", label: "Name", disabled: false, value: new FormControl(''), type: FieldType.input },
    { colspan: 1, name: "description", placeholder: "Description", label: "Description", disabled: false, value: new FormControl(''), type: FieldType.input },
    { colspan: 1, name: "email", placeholder: "Email", label: "Email", disabled: false, value: new FormControl('', [Validators.required, Validators.email]), type: FieldType.input },
    { colspan: 1, name: "total", placeholder: "Total", label: "Total", disabled: true, value: new FormControl(100), type: FieldType.input },
  ]

  it('should be created a FormItems with validations', () => {
    // given
    const builder = new FormItemsBuilderService();

    // when
    const buildedItems = builder
                            .addItem({ name: 'name', value: '' })
                            .addItem({ name: 'description', value: '' }).addValidations([Validators.required])
                            .addItem({ name: 'email', value: '' }).addValidations([Validators.required, Validators.email])
                            .addItem({ name: 'total', value: 100 }).disabled()
                            .build();

    buildedItems.forEach((item, index) => {
      expect(item.colspan).toEqual(items.at(index)?.colspan);
      expect(item.label).toEqual(items.at(index)?.label);
      expect(item.name).toEqual(items.at(index)?.name);
      expect(item.placeholder).toEqual(items.at(index)?.placeholder);
      expect(item.type).toEqual(items.at(index)?.type);
      expect(item.value.value).toEqual(items.at(index)?.value.value);
      expect(item.value.hasValidator).toEqual(items.at(index)?.value.hasValidator);
      expect(item.value.disabled).toBe(items.at(index)?.disabled);
    })
  });
});

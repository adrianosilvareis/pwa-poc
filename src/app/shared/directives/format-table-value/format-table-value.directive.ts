import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { formatDate } from '@angular/common';
import { environment as env } from '@root/environments/environment';

type AutocompleteObject = { [value: string]: string };

@Directive({
  selector: '[appFormatTableValue]'
})
export class FormatTableValueDirective implements OnChanges {
  @Input() value: unknown = null;
  @Input() type!: string;
  @Input() labelName? = 'id';

  formattedValue: unknown = null;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.formatValue();
    }
  }

  private formatValue(): void {
    switch (this.type) {
      case 'date':
        this.formattedValue = this.formatDateValue(this.value as Date);
        break;
      case 'currency':
        this.formattedValue = this.formatCurrencyValue(this.value as string);
        break;
      case 'YesNo':
        this.formattedValue = this.formatYesNoValue(this.value as boolean);
        break;
      case 'autocomplete':
        this.formattedValue = this.formatAutoCompleteValue(this.value as AutocompleteObject);
        break;
      case 'input':
        this.formattedValue = this.formatSimpleInput(this.value);
        break;
      default:
        this.formattedValue = this.value as string | number;
        break;
    }

    this.el.nativeElement.innerText = this.formattedValue;
  }

  private formatDateValue(value: Date): string {
    // Customize the date format based on your requirements
    return formatDate(value, env.patterns.dateFormat, env.patterns.locale);
  }

  private formatCurrencyValue(value: string): string {
    // Customize the currency formatting based on your requirements
    const currencyValue = parseFloat(value);
    return currencyValue.toLocaleString(env.patterns.locale, { style: 'currency', currency: env.patterns.currencyFormat });
  }

  private formatYesNoValue(value: boolean): string {
    return value ? 'Yes' : 'No';
  }

  private formatAutoCompleteValue(value: AutocompleteObject): string {
    if (!this.labelName) {
      return value['id'] as string;
    }
    return value[this.labelName] as string;
  }

  private formatSimpleInput(value: unknown): string {
    if (value === null || value === undefined) {
      return '';
    }
    return value as string;
  }
}

import { CurrencyPipe } from '@angular/common';
import { CurrencyFormatterDirective } from './currency-formatter.directive';
import { ElementRef } from '@angular/core';

describe('CurrencyFormatterDirective', () => {
  it('should create an instance', () => {
    const { directive } = setup();
    expect(directive).toBeTruthy();
  });

  it('should format a input value correctly', () => {
    const { directive, input } = setup();

    directive.onChange('1');
    expect(input.value).toBe('$0.01');

    directive.onChange('12');
    expect(input.value).toBe('$0.12');

    directive.onChange('123');
    expect(input.value).toBe('$1.23');

    directive.onChange('1234');
    expect(input.value).toBe('$12.34');

    directive.onChange('123456789');
    expect(input.value).toBe('$1,234,567.89');
  });
});

const setup = () => {
  const input = document.createElement('input');
  const currencyPipe = new CurrencyPipe('en-US');
  const ref = new ElementRef(input);
  const directive = new CurrencyFormatterDirective(ref, currencyPipe);
  return { directive, input };
}

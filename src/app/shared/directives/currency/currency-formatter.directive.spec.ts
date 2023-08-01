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

    const scenarios = [
      { input: '0', expected: '$0.00' },
      { input: '$0.010', expected: '$0.10' },
      { input: '$0.100', expected: '$1.00' },
      { input: '1', expected: '$0.01' },
      { input: '12', expected: '$0.12' },
      { input: '123', expected: '$1.23' },
      { input: '1234', expected: '$12.34' },
      { input: '123456789', expected: '$1,234,567.89' },
    ]

    scenarios.forEach(({ input: inputValue, expected }) => {
      directive.onChange(inputValue);
      expect(input.value).toBe(expected);
    });
  });
});

const setup = () => {
  const input = document.createElement('input');
  const currencyPipe = new CurrencyPipe('en-US');
  const ref = new ElementRef(input);
  const directive = new CurrencyFormatterDirective(ref, currencyPipe);
  return { directive, input };
}

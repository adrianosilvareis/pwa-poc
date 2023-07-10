import { ElementRef, SimpleChange } from '@angular/core';
import { FormatTableValueDirective } from './format-table-value.directive';

type scenario = { value: unknown, type: string, expected: string | number };

describe('FormatTableValueDirective', () => {
  it('should format to a simple text', () => {
    const inputScenarios: scenario[] = [
      { value: 'value', type: 'input', expected: 'value' },
      { value: '', type: 'input', expected: '' },
      { value: null, type: 'input', expected: '' },
      { value: undefined, type: 'input', expected: '' },
    ]

    runTests(inputScenarios);
  });

  it('should format to a currency', () => {
    const currencyScenarios = [
      { value: 0, type: 'currency', expected: 'R$0.00' },
      { value: 1, type: 'currency', expected: 'R$1.00' },
      { value: 1.1, type: 'currency', expected: 'R$1.10' },
      { value: 1.11, type: 'currency', expected: 'R$1.11' },
      { value: 123456789, type: 'currency', expected: 'R$123,456,789.00' },
    ]

    runTests(currencyScenarios);
  });

  it('should format to a date', () => {
    const currencyScenarios = [
      { value: new Date(), type: 'date', expected: new Date().toLocaleDateString('pt-BR') },
    ]

    runTests(currencyScenarios);
  });

  it('should format to a YesNo', () => {
    const currencyScenarios = [
      { value: false, type: 'YesNo', expected: 'No' },
      { value: null, type: 'YesNo', expected: 'No' },
      { value: 0, type: 'YesNo', expected: 'No' },
      { value: undefined, type: 'YesNo', expected: 'No' },
      { value: '0', type: 'YesNo', expected: 'Yes' },
      { value: '1', type: 'YesNo', expected: 'Yes' },
      { value: true, type: 'YesNo', expected: 'Yes' },
    ]

    runTests(currencyScenarios);
  });

  it('should format to a Number', () => {
    const numberScenarios = [
      { value: 1, type: 'number', expected: 1 },
      { value: 10001245, type: 'number', expected: 10001245 },
    ]

    runTests(numberScenarios);
  });

  it('should format to a autocomplete', () => {
    const numberScenarios = [
      { value: { id: '123456', name: 'Adriano' }, type: 'autocomplete', expected: 'Adriano' },
    ]

    runTests(numberScenarios);
  });
});

const mockedSimplesChanges = { value: new SimpleChange(null, null, true) };

const runTests = (scenarios: scenario[]) => {
  const directive = new FormatTableValueDirective(new ElementRef({}));
  directive.labelName = 'name';

  scenarios.forEach(scenario => {
    directive.value = scenario.value;
    directive.type = scenario.type;
    directive.ngOnChanges(mockedSimplesChanges);
    expect(directive.formattedValue).toBe(scenario.expected);
  });
}

import { TestBed } from "@angular/core/testing";
import { ContractsFormUpdateService } from "./contracts-form-update.service";
import { FormControl, FormGroup } from "@angular/forms";
import { CompanyServicesModel } from "../../../company-services/model/company-services.model";

describe('ContractsFormUpdateService', () => {
  let contract: ContractsFormUpdateService;

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [],
        providers: [ContractsFormUpdateService]
      });
      contract = TestBed.inject(ContractsFormUpdateService);
  });

  it('should update discount correctly based on suggestedValue and price', () => {
    const group = setup();
    group.get('price')?.setValue(100);
    group.get('suggestedValue')?.setValue(200);
    contract.updateDiscount(group);
    expect(group.get('discount')?.value).toBe(50);
  });

  it('should update price correctly based on suggestedValue and discount', () => {
    const group = setup();
    group.get('suggestedValue')?.setValue(200);
    group.get('discount')?.setValue(50);
    contract.updatePriceValue(group);
    expect(group.get('price')?.value).toBe(100);
  });

  it('should update suggestedValue correctly based on selectedServices', () => {
    const group = setup();
    const allServices: CompanyServicesModel[] = [
      { id: '1', title: 'service1', value: 100, description: 'service1', isActive: true },
      { id: '2', title: 'service2', value: 200, description: 'service2', isActive: true },
      { id: '3', title: 'service3', value: 300, description: 'service3', isActive: true },
    ];
    group.get('services')?.setValue(['1', '2']);
    contract.updateSuggestedValue(allServices, group);
    expect(group.get('suggestedValue')?.value).toBe(300);
  });

  it('should return total correctly based on selectedServices', () => {
    const allServices: CompanyServicesModel[] = [
      { id: '1', title: 'service1', value: 100, description: 'service1', isActive: true },
      { id: '2', title: 'service2', value: 200, description: 'service2', isActive: true },
      { id: '3', title: 'service3', value: 300, description: 'service3', isActive: true },
    ];
    const total = contract.calcTotalSuggested(allServices, ['1', '2']);
    expect(total).toBe(300);
  });
});

const setup = function () {
  const group = new FormGroup({
    price: new FormControl(0),
    suggestedValue: new FormControl(0),
    discount: new FormControl(0),
    services: new FormControl<string[]|null>(null),
  });
  return group
}

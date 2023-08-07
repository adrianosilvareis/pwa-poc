import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CompanyServicesModel } from '@root/app/pages/company-services/model/company-services.model';

@Injectable({
  providedIn: 'root'
})
export class ContractsFormUpdateService {
  public updateDiscount(form: FormGroup) {
    const price = form.get('price')?.value ?? 0;
    const suggestedValue = form.get('suggestedValue')?.value ?? 0;
    if (suggestedValue === 0 || price === 0) {
      form.get('discount')?.setValue(0);
      return;
    }
    const discount = (suggestedValue - price) / suggestedValue * 100;
    form.get('discount')?.setValue(discount);
  }

  public updatePriceValue(form: FormGroup) {
    const suggestedValue = form.get('suggestedValue')?.value ?? 0;
    const discount = form.get('discount')?.value ?? 0;
    if (suggestedValue === 0 || discount === 0) {
      form.get('price')?.setValue(0);
      return;
    }
    const price = suggestedValue - (suggestedValue * discount / 100);
    form.get('price')?.setValue(price);
  }

  public updateSuggestedValue (allServices: CompanyServicesModel[], form: FormGroup): void {
    const services = form.get('services')?.value as string[];
    if (services === null ) {
      form.get('suggestedValue')?.setValue(0);
      return;
    }
    const total = this.calcTotalSuggested(allServices, services);
    form.get('suggestedValue')?.setValue(total);
  }

  public calcTotalSuggested(allServices: CompanyServicesModel[], services: string[]) {
    return services.reduce((acc, service) => {
      acc += Number(allServices.find(({ id }) => id === service)?.value);
      return acc;
    },0)
  }
}

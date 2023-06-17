import { selectActiveServices } from '@root/app/pages/company-services/store/company-services.selectors';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@root/app/app-state';
import { FieldType, FormItems } from '@root/app/components/form/items.model';
import { contractsPageActions } from '@root/app/pages/contracts/store/contracts.actions';
import { isContractLoading, selectedContract } from '@root/app/pages/contracts/store/contracts.selectors';
import { FormItemsBuilderService } from '@root/app/services/form-items/form-items-builder.service';
import { Unsubscribe } from '@root/app/utils/unsubscribe';
import { ContractsModel } from '../../model/contracts.models';
import { servicesPageActions } from '@root/app/pages/company-services/store/company-services.actions';
import { combineLatest } from 'rxjs';
import { CompanyServicesModel } from '@root/app/pages/company-services/model/company-services.model';

@Component({
  selector: 'app-contracts-form',
  templateUrl: './contracts-form.component.html',
  styleUrls: ['./contracts-form.component.scss']
})
export class ContractsFormComponent extends Unsubscribe implements OnInit {
  id!: string;

  contract!: ContractsModel | null;

  data!: FormItems[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormItemsBuilderService,
    private store: Store<AppState>,
  ) { super(); }

  ngOnInit() {
    this.store.dispatch(servicesPageActions.loadServices());
    this.subs.add(this.fillId());
    this.subs.add(this.generateForm());
  }

  saveContract(contract: ContractsModel) {
    if (this.id) {
      this.store.dispatch(contractsPageActions.editContract({ contract: this.sanitize(contract) }));
    } else {
      this.store.dispatch(contractsPageActions.addContract({ contract: this.sanitize(contract) }));
    }
    this.subs.add(this.backToList());
  }

  cancel() {
    this.router.navigate(['/contracts']);
  }

  private backToList() {
    return this.store
      .select(isContractLoading)
      .subscribe(isLoading => { if(!isLoading) { this.router.navigate(['/contracts']); } });
  }

  private fillId() {
    return this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  private generateForm() {
    if (this.id) {
      this.store.dispatch(contractsPageActions.getContractById({ id: this.id }));
    } else {
      this.store.dispatch(contractsPageActions.selectContract({ contract: null }));
    }

    const servicesOptions$ = this.store.select(selectActiveServices);

    const contract$ = this.store.select(selectedContract);

    return combineLatest([contract$, servicesOptions$]).subscribe(([item, servicesOptions]) => {
      this.contract = item;
      if (item) {
        this.data = this.buildData(servicesOptions, item);
      } else {
        this.data = this.buildData(servicesOptions)
      }
    });
  }

  private buildData(servicesOptions: CompanyServicesModel[], item?: ContractsModel) {
    return this.builder
      .addItem({ name: 'startDate', value: item?.startDate, clearable: true, type: FieldType.datepick }).addValidations([Validators.required])
      .addItem({ name: 'endDate', value: item?.endDate, clearable: true, type: FieldType.datepick })
      .addItem({ name: 'renewable', value: item?.renewable, clearable: true })
      .addItem({ name: 'services', value: item?.services, clearable: true, type: FieldType.autocomplete }).addOptions(servicesOptions.map(service => ({ value: service.id, label: service.title })))
      .addItem({ name: 'price', value: item?.price, clearable: true })
      .build();
  }

  private sanitize(formContract: ContractsModel):ContractsModel {
    return {
      id: this.contract?.id,
      startDate: formContract.startDate,
      endDate: formContract.endDate,
      renewable:formContract.renewable,
      price: formContract.price,
      services: this.contract?.services ?? [],
      isActive: this.contract?.isActive ?? false
    }
  }
}

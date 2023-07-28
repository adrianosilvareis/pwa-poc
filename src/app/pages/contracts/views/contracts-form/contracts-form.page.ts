import { selectActiveServices } from '@root/app/pages/company-services/store/company-services.selectors';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@root/app/app-state';
import { FieldType } from '@root/app/shared/components/form/protocols/field-type';
import { FormItems } from "@root/app/shared/components/form/protocols/form-item";
import { contractsPageActions } from '@root/app/pages/contracts/store/contracts.actions';
import { isContractLoading, selectedContract } from '@root/app/pages/contracts/store/contracts.selectors';
import { FormItemsBuilderService } from '@root/app/services/form-items/form-items-builder.service';
import { Unsubscribe } from '@root/app/utils/unsubscribe';
import { ContractsModel } from '@pages/contracts/model/contracts.models';
import { ContractsData } from "../../model/contracts.data";
import { servicesPageActions } from '@root/app/pages/company-services/store/company-services.actions';
import { combineLatest } from 'rxjs';
import { CompanyServicesModel } from '@root/app/pages/company-services/model/company-services.model';

@Component({
  templateUrl: './contracts-form.page.html',
  styleUrls: ['./contracts-form.page.scss']
})
export class ContractsFormPage extends Unsubscribe implements OnInit {
  id!: string;
  contract!: ContractsModel | null;
  data!: FormItems[];

  services!: CompanyServicesModel[];

  servicesOptions$ = this.store.select(selectActiveServices);
  contract$ = this.store.select(selectedContract);

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

  saveContract(contract: ContractsData) {
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

    return combineLatest([this.contract$, this.servicesOptions$]).subscribe(([item, services]) => {
      this.services = services;
      this.contract = item;
      if (item) {
        this.data = this.buildData(services, item);
      } else {
        this.data = this.buildData(services)
      }
    });
  }

  private buildData(servicesOptions: CompanyServicesModel[], item?: ContractsModel) {
    return this.builder
      .addItem({ name: 'startDate', value: item?.startDate, clearable: true, type: FieldType.date })
        .addValidations([Validators.required])
      .addItem({ name: 'endDate', value: item?.endDate, clearable: true, type: FieldType.date })
      .addItem({ name: 'services', value: item?.services.map(({ id }) => id), clearable: true, type: FieldType.multiselect })
        .addOptions(servicesOptions.map(service => ({ value: service.id, label: service.title })))
      .addItem({ name: 'price', value: item?.price, clearable: true, type: FieldType.currency })
      .addItem({ name: 'renewable', value: item?.renewable, clearable: true, type: FieldType.YesNo })
      .build();
  }

  private sanitize(formContract: ContractsData):ContractsModel {
    return {
      id: this.contract?.id,
      startDate: formContract.startDate,
      endDate: formContract.endDate,
      renewable:formContract.renewable,
      price: formContract.price,
      services: this.getServices(formContract.services),
      isActive: this.contract?.isActive ?? true
    }
  }

  private getServices(services: string[]): CompanyServicesModel[] {
    return this.services.filter((service) => services.find((id) => id === service.id));
  }
}

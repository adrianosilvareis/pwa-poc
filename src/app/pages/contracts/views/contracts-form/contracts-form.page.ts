import { selectActiveServices } from '@root/app/pages/company-services/store/company-services.selectors';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@root/app/app-state';
import { FieldType } from '@root/app/shared/components/form/protocols/field-type';
import { FormItems } from "@root/app/shared/components/form/protocols/form-item";
import { contractsPageActions } from '@root/app/pages/contracts/store/contracts.actions';
import { isContractLoading, selectedContract } from '@root/app/pages/contracts/store/contracts.selectors';
import { FormItemsBuilder } from '@root/app/services/form-items/form-items.builder';
import { Unsubscribe } from '@root/app/utils/unsubscribe';
import { ContractsModel } from '@pages/contracts/model/contracts.models';
import { ContractsData } from "@pages/contracts/model/contracts.data";
import { servicesPageActions } from '@root/app/pages/company-services/store/company-services.actions';
import { Observable, combineLatest, takeUntil } from 'rxjs';
import { CompanyServicesModel } from '@root/app/pages/company-services/model/company-services.model';
import { ContractsFormUpdateService } from '@pages/contracts/services/contracts-form-update/contracts-form-update.service';
import { selectActiveClients } from '@root/app/pages/clients/store/clients.selectors';
import { ClientModel } from '@root/app/pages/clients/model/client.model';
import { OptionsType } from '@root/app/shared/components/form/protocols/options-type';
import { clientsPageActions } from '@root/app/pages/clients/store/clients.actions';

type ContractsOptions = { client: OptionsType[], services: OptionsType[] };

@Component({
  template: `
    <app-form
      title="Contract"
      [data]="data"
      [formId]="id"
      role="form"
      (save)="saveContract($event)"
      (cancel)="cancel()"
      (mounted)="onMounted($event)"
    ></app-form>
  `
})
export class ContractsFormPage extends Unsubscribe implements OnInit {
  id!: string;
  contract!: ContractsModel | null;
  data!: FormItems[];

  services!: CompanyServicesModel[];
  clients!: ClientModel[];

  servicesOptions$ = this.store.select(selectActiveServices);
  clientsOptions$ = this.store.select(selectActiveClients);
  contract$ = this.store.select(selectedContract);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormItemsBuilder,
    private store: Store<AppState>,
    private contractRules: ContractsFormUpdateService,
  ) { super(); }

  onMounted({ form }: { form: FormGroup }) {
    const statusFlag = {
      discount: false,
      price: false,
    }
    this.contractRules.updateSuggestedValue(this.services, form);
    this.onServicesUpdate(form);
    this.onPriceOrSuggestedChanges(form, statusFlag);
    this.onDiscountUpdate(form, statusFlag);
  }

  private onDiscountUpdate(form: FormGroup, statusFlag: { discount: boolean; price: boolean; }) {
    const discount$ = form.get('discount')?.valueChanges as Observable<number>;
    discount$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      if (statusFlag.price) {
        statusFlag.price = !statusFlag.price;
        return;
      }
      statusFlag.discount = true;
      this.contractRules.updatePriceValue(form);
    });
  }

  private onServicesUpdate(form: FormGroup) {
    const services$ = form.get('services')?.valueChanges as Observable<number>;
    services$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.contractRules.updateSuggestedValue(this.services, form);
    });
  }

  private onPriceOrSuggestedChanges(form: FormGroup, statusFlag: { discount: boolean; price: boolean; }) {
    const suggestedValue$ = form.get('suggestedValue')?.valueChanges as Observable<number>;
    const price$ = form.get('price')?.valueChanges as Observable<number>;
    combineLatest([suggestedValue$, price$]).pipe(takeUntil(this.destroyed$)).subscribe(() => {
      if (statusFlag.discount) {
        statusFlag.discount = !statusFlag.discount;
        return;
      }
      statusFlag.price = true;
      this.contractRules.updateDiscount(form);
    });
  }

  ngOnInit() {
    this.store.dispatch(servicesPageActions.loadServices());
    this.store.dispatch(clientsPageActions.loadClients());
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
      .pipe(takeUntil(this.destroyed$))
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

    return combineLatest([this.contract$, this.servicesOptions$, this.clientsOptions$])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([item, services, clients]) => {
        if (!services || !clients) return;
        this.services = services;
        this.clients = clients;
        this.contract = item;

        const options = {
          client: this.clients.map(({ id, name }) => ({ value: id, label: name })),
          services: this.services.map(({ id, title }) => ({ value: id, label: title }))
        }
        if (item) {
          this.data = this.buildData(options, item);
        } else {
          this.data = this.buildData(options)
        }
      });
  }

  private buildData(options: ContractsOptions, item?: ContractsModel) {
    return this.builder
      .addItem({ name: 'client', label: 'Cliente', value: item?.client, clearable: true, type: FieldType.autocomplete })
        .addOptions(options.client).addValidations([Validators.required]).disabledWhen(!!item)
      .addItem({ name: 'startDate', label: 'Data de Inicio', value: item?.startDate ?? new Date(), clearable: true, type: FieldType.date })
        .addValidations([Validators.required])
      .addItem({ name: 'endDate', label: 'Data de Fim', value: item?.endDate, clearable: true, type: FieldType.date })
      .addItem({ name: 'services', label: 'Serviços', value: item?.services.map(({ id }) => id), clearable: true, type: FieldType.multiselect })
        .addOptions(options.services).addValidations([Validators.required])
      .addItem({ name: 'price', label: 'Preço', value: item?.price ?? 0, clearable: true, type: FieldType.currency })
      .addItem({ name: 'suggestedValue', label: 'Preço Sugerido', value: item?.suggestedValue ?? 0, type: FieldType.currency }).disabled()
      .addItem({ name: 'discount', suffix: '%',  label: 'Desconto', value: item?.discount ?? 0, type: FieldType.input }).addValidations([Validators.min(0), Validators.max(80)])
      .addItem({ name: 'renewable', label: 'Renovável', value: item?.renewable ?? true, clearable: true, type: FieldType.YesNo })
      .build();
  }

  private sanitize(formContract: ContractsData):ContractsModel {
    return {
      id: this.contract?.id,
      client: formContract.client,
      startDate: formContract.startDate,
      endDate: formContract.endDate,
      renewable:formContract.renewable,
      price: formContract.price,
      suggestedValue: formContract.suggestedValue,
      discount: formContract.discount,
      services: this.getServices(formContract.services),
      isActive: this.contract?.isActive ?? true
    }
  }

  private getServices(services: string[]): CompanyServicesModel[] {
    return this.services.filter((service) => services.find((id) => id === service.id));
  }
}

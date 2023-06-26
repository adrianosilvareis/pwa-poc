import { Component, OnInit } from '@angular/core';
import { CompanyServicesModel } from '@pages/company-services/model/company-services.model';
import { FormItems } from '@root/app/shared/components/form/items.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormItemsBuilderService } from '@root/app/services/form-items/form-items-builder.service';
import { AppState } from '@root/app/app-state';
import { Store } from '@ngrx/store';
import { Validators } from '@angular/forms';
import { Unsubscribe } from '@root/app/utils/unsubscribe';
import { servicesPageActions } from '@pages/company-services/store/company-services.actions';
import { isServiceLoading, selectedService } from '@pages/company-services/store/company-services.selectors';

@Component({
  selector: 'app-company-service-form',
  templateUrl: './company-service-form.component.html',
  styleUrls: ['./company-service-form.component.scss']
})
export class CompanyServiceFormComponent extends Unsubscribe implements OnInit {
  id!: string;

  service!: CompanyServicesModel | null;

  data!: FormItems[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormItemsBuilderService,
    private store: Store<AppState>,
  ) { super(); }

  ngOnInit() {
    this.subs.add(this.fillId());
    this.subs.add(this.generateForm());
  }

  saveService(service: CompanyServicesModel) {
    if (this.id) {
      this.store.dispatch(servicesPageActions.editService({ service: this.sanitize(service) }));
    } else {
      this.store.dispatch(servicesPageActions.addService({ service: this.sanitize(service) }));
    }
    this.subs.add(this.backToList());
  }

  cancel() {
    this.router.navigate(['/services']);
  }

  private backToList() {
    return this.store
      .select(isServiceLoading)
      .subscribe(isLoading => { if(!isLoading) { this.router.navigate(['/services']); } });
  }

  private fillId() {
    return this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  private generateForm() {
    if (this.id) {
      this.store.dispatch(servicesPageActions.getServiceById({ id: this.id }));
    } else {
      this.store.dispatch(servicesPageActions.selectService({ service: null }));
    }

    return this.store.select(selectedService).subscribe(item => {
      this.service = item;
      if (item) {
        this.data = this.buildData(item);
      } else {
        this.data = this.buildData()
      }
    });
  }

  private buildData(item?: CompanyServicesModel) {
    return this.builder
      .addItem({ name: 'title', colspan: 2, value: item?.title }).addValidations([Validators.required])
      .addItem({ name: 'description', colspan: 2, value: item?.description }).addValidations([Validators.required])
      .addItem({ name: 'value', value: item?.value }).addValidations([Validators.required])
      .build();
  }

  private sanitize(formService: CompanyServicesModel):CompanyServicesModel {
    return {
      id: this.service?.id,
      title: formService.title,
      description: formService.description,
      value: formService.value,
      isActive: this.service?.isActive ?? false
    }
  }
}

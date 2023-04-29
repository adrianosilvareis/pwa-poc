import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CompanyServicesModel } from '@pages/company-services/model/company-services.model';

export const servicesPageActions = createActionGroup({
  source: 'Services Page',
  events: {
    // select
    'Select Service': props<{service: CompanyServicesModel | null}>(),
    'Get Service By Id': props<{id: string}>(),
    //load
    'Load Services': emptyProps(),
    'Success on Load Services': props<{services: CompanyServicesModel[]}>(),
    'Error on Load Services': emptyProps(),
    // add
    'Add Service': props<{service: CompanyServicesModel}>(),
    'Success on Add Service': props<{service: CompanyServicesModel}>(),
    'Error on Add Service': emptyProps(),
    // edit
    'Edit Service': props<{service: CompanyServicesModel}>(),
    'Success on Edit Service': props<{service: CompanyServicesModel}>(),
    'Error on Edit Service': emptyProps(),
    // remove
    'Delete Service': emptyProps(),
    'Success on Delete Service': emptyProps(),
    'Error on Delete Service': emptyProps(),
  }
});

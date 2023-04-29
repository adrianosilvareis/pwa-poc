import { createReducer, on } from '@ngrx/store';
import { CompanyServicesModel } from '@pages/company-services/model/company-services.model';
import { servicesPageActions } from './company-services.actions';

export interface CompanyServicesState {
  services: CompanyServicesModel[],
  newService: CompanyServicesModel | null,
  selectedService: CompanyServicesModel | null,
  selectedServiceId?: string,
  isServiceLoading: boolean,
  errorOnLoadServices: boolean,
  errorOnAddServices: boolean,
  errorOnEditServices: boolean,
  errorOnDeleteServices: boolean
}

export const initialState: CompanyServicesState = {
  services: [],
  newService: null,
  selectedService: null,
  selectedServiceId: undefined,
  isServiceLoading: false,
  errorOnLoadServices: false,
  errorOnAddServices: false,
  errorOnEditServices: false,
  errorOnDeleteServices: false,
};

export const servicesReducer = createReducer(
  initialState,
  // select
  on(servicesPageActions.selectService, (state, { service }) => ({ ...state, selectedService: service, selectedServiceId: service ? service.id : undefined })),
  on(servicesPageActions.getServiceById, (state, { id }) => ({ ...state, selectedService: getServiceById(id, state.services), selectedServiceId: id })),
  // load
  on(servicesPageActions.loadServices, (state) => ({ ...state, errorOnLoadServices: false, isServiceLoading: true })),
  on(servicesPageActions.successOnLoadServices, (state, { services }) => ({ ...state, services, isServiceLoading: false })),
  on(servicesPageActions.errorOnLoadServices, (state) => ({ ...state, errorOnLoadServices: true, isServiceLoading: false })),
  // add
  on(servicesPageActions.addService, (state, { service }) => ({ ...state, newService: service, errorOnAddServices: false, isServiceLoading: true })),
  on(servicesPageActions.successOnAddService, (state, { service }) => ({ ...state, services: [...state.services, service], newService: null, isServiceLoading: false })),
  on(servicesPageActions.errorOnAddService, (state) => ({ ...state, errorOnAddServices: true, isServiceLoading: false })),
  // edit
  on(servicesPageActions.editService, (state, { service }) => ({ ...state, errorOnEditServices: false, selectedService: service, selectedServiceId: service.id, isServiceLoading: true })),
  on(servicesPageActions.successOnEditService, (state, { service }) => ({ ...state, services: updateService(state.selectedService as CompanyServicesModel, service, state.services), isServiceLoading: false })),
  on(servicesPageActions.errorOnEditService, (state) => ({ ...state, errorOnEditServices: true, isServiceLoading: false })),
  // delete
  on(servicesPageActions.deleteService, (state) => ({ ...state, errorOnDeleteServices: false, isServiceLoading: true })),
  on(servicesPageActions.successOnDeleteService, (state) => ({ ...state, services: removeService(state.selectedService as CompanyServicesModel, state.services), selectedService: null, isServiceLoading: false })),
  on(servicesPageActions.errorOnDeleteService, (state) => ({ ...state, errorOnDeleteServices: true, isServiceLoading: false })),
);

function getServiceById(id: string, services: CompanyServicesModel[]) {
  return services.find(service => service.id === id) ?? null;
}

function updateService(currentService: CompanyServicesModel, updatedService: CompanyServicesModel, services: CompanyServicesModel[]) {
  return services.map(service => service.id === currentService.id ? updatedService : service);
}

function removeService(currentService: CompanyServicesModel, services: CompanyServicesModel[]) {
  return services.filter(service => service.id !== currentService.id);
}

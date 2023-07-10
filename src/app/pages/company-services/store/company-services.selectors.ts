import { createSelector } from "@ngrx/store";
import { AppState } from "@root/app/app-state";
import { CompanyServicesState } from "./company-services.reducer";
import { OptionsType } from "@root/app/shared/components/form/items.model";

export const selectServiceState = (state: Partial<AppState>) => state.service as CompanyServicesState;

export const newService = createSelector(selectServiceState, (state: CompanyServicesState) => state.newService);
export const isServiceLoading = createSelector(selectServiceState, (state: CompanyServicesState) => state.isServiceLoading);
export const selectedService = createSelector(selectServiceState, (state: CompanyServicesState) => state.selectedService);
export const selectedServiceId = createSelector(selectServiceState, (state: CompanyServicesState) => state.selectedServiceId);
export const selectActiveServices = createSelector(selectServiceState, (state: CompanyServicesState) => state.services.filter(({isActive}) => isActive));
export const selectServices = createSelector(selectServiceState, (state: CompanyServicesState) => state.services);
export const selectOptionsServices = createSelector(selectServiceState,
  (state: CompanyServicesState): OptionsType[] => state.services.map(({id, title}) => ({ value: id, label: title })));

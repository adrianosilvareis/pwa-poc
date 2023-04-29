import { createSelector } from "@ngrx/store";
import { AppState } from "@root/app/app-state";
import { CompanyServicesState } from "./company-services.reducer";

export const selectService = (state: Partial<AppState>) => state.service as CompanyServicesState;

export const newService = createSelector(selectService, (state: CompanyServicesState) => state.newService);
export const isServiceLoading = createSelector(selectService, (state: CompanyServicesState) => state.isServiceLoading);
export const selectedService = createSelector(selectService, (state: CompanyServicesState) => state.selectedService);
export const selectedServiceId = createSelector(selectService, (state: CompanyServicesState) => state.selectedServiceId);
export const selectActiveServices = createSelector(selectService, (state: CompanyServicesState) => state.services.filter(({isActive}) => isActive));

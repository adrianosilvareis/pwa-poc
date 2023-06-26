import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { servicesPageActions } from './company-services.actions';
import { newService, selectActiveServices, selectedService, selectedServiceId } from './company-services.selectors';
import { CompanyServicesModel } from '../model/company-services.model';
import { CompanyServicesService } from '../services/company-services.service';
import { AppState } from '@root/app/app-state';

@Injectable()
export class ServicesEffects {

  loadServices$ = createEffect(() => this.actions$.pipe(
    ofType(servicesPageActions.loadServices),
    withLatestFrom(this.store.select(selectActiveServices)),
    exhaustMap(([, services]) => this.loadServices(services)))
  );

  getServiceById$ = createEffect(() => this.actions$.pipe(
    ofType(servicesPageActions.getServiceById),
    withLatestFrom(this.store.select(selectedService), this.store.select(selectedServiceId)),
    exhaustMap(([, service, serviceId]) => this.getService(service, serviceId)))
  );

  addServices$ = createEffect(() => this.actions$.pipe(
    ofType(servicesPageActions.addService),
    withLatestFrom(this.store.select(newService)),
    exhaustMap(([, service]) => this.addServices(service as CompanyServicesModel)))
  );

  editServices$ = createEffect(() => this.actions$.pipe(
    ofType(servicesPageActions.editService),
    withLatestFrom(this.store.select(selectedService)),
    exhaustMap(([, service]) => this.editServices(service as CompanyServicesModel)))
  );

  deleteServices$ = createEffect(() => this.actions$.pipe(
    ofType(servicesPageActions.deleteService),
    withLatestFrom(this.store.select(selectedService)),
    exhaustMap(([, service]) => this.deleteServices(service as CompanyServicesModel)))
  );

  constructor(
    private actions$: Actions,
    private servicesService: CompanyServicesService,
    private store: Store<AppState>
  ) {}

  private loadServices(services: CompanyServicesModel[]) {
    return services.length > 0 ?
      of(servicesPageActions.successOnLoadServices({ services })):
      this.servicesService.loadServices()
        .pipe(
          map(services => servicesPageActions.successOnLoadServices({ services })),
          catchError(() => of(servicesPageActions.errorOnLoadServices()))
        )
  }

  private getService(service: CompanyServicesModel | null, serviceId?: string) {
    return service ?
      of(servicesPageActions.selectService({ service })):
      this.servicesService.getServiceById(serviceId as string)
        .pipe(
          map(service => servicesPageActions.selectService({ service })),
          catchError(() => of(servicesPageActions.selectService({ service: null })))
        )
  }

  private addServices(newService: CompanyServicesModel) {
    return this.servicesService.addServices(newService)
      .pipe(
        map(service => servicesPageActions.successOnAddService({ service })),
        catchError(() => of(servicesPageActions.errorOnAddService()))
      )
  }

  private editServices(service: CompanyServicesModel) {
    return this.servicesService.editServices(service)
      .pipe(
        map(service => servicesPageActions.successOnEditService({ service })),
        catchError(() => of(servicesPageActions.errorOnEditService()))
      )
  }

  private deleteServices(service: CompanyServicesModel) {
    return this.servicesService.deleteServices(service)
      .pipe(
        map(() => servicesPageActions.successOnDeleteService()),
        catchError(() => of(servicesPageActions.errorOnDeleteService()))
      )
  }
}

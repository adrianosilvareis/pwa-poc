import { CompanyServicesModel } from "../model/company-services.model";
import { servicesPageActions } from "./company-services.actions";
import { CompanyServicesState, servicesReducer } from "./company-services.reducer";

describe('CompanyServicesReducer', () => {
  it('should field selectedService and selectedServiceId correctly on selectService', () => {
    const selectedState = servicesReducer(setupInitialState(), servicesPageActions.selectService({ service: setupService('1') }));

    expect(selectedState.selectedService).toEqual(setupService('1'));
    expect(selectedState.selectedServiceId).toBe('1');

    const nonSelectedState = servicesReducer(setupInitialState(), servicesPageActions.selectService({ service: null }));

    expect(nonSelectedState.selectedService).toBeNull();
    expect(nonSelectedState.selectedServiceId).toBeUndefined();
  });

  it('should find in loaded items when match id on getServiceById', () => {
    const state = servicesReducer(setupInitialState(), servicesPageActions.getServiceById({ id: '3'}));

    expect(state.selectedService).toEqual(setupService('3'));
    expect(state.selectedServiceId).toBe('3');
  });

  it('should set  errorOnLoadServices to false and isServiceLoading to true on loadServices', () => {
    const currentState = setupInitialState();
    currentState.errorOnLoadServices = true;
    currentState.isServiceLoading = false

    const state = servicesReducer(currentState, servicesPageActions.loadServices());

    expect(state.errorOnLoadServices).toBeFalsy();
    expect(state.isServiceLoading).toBeTruthy();
  });

  it('should set services with list provided and isServiceLoading to false on successOnLoadServices', () => {
    const currentState = setupInitialState();
    currentState.isServiceLoading = true

    const state = servicesReducer(currentState, servicesPageActions.successOnLoadServices({ services: [setupService('123456789')] }));

    expect(state.services).toEqual([setupService('123456789')]);
    expect(state.isServiceLoading).toBeFalsy();
  });

  it('should set errorOnLoadServices to true and isServiceLoading to false on errorOnLoadServices', () => {
    const currentState = setupInitialState();
    currentState.isServiceLoading = true
    currentState.errorOnLoadServices = false

    const state = servicesReducer(currentState, servicesPageActions.errorOnLoadServices());

    expect(state.isServiceLoading).toBeFalsy();
    expect(state.errorOnLoadServices).toBeTruthy();
  });

  it('should set newService service provided, errorOnAddServices to false and isServiceLoading to true on addService', () => {
    const currentState = setupInitialState();
    currentState.isServiceLoading = false
    currentState.errorOnAddServices = false

    const state = servicesReducer(currentState, servicesPageActions.addService({ service: setupService('12345789') }));

    expect(state.newService).toEqual(setupService('12345789'));
    expect(state.isServiceLoading).toBeTruthy();
    expect(state.errorOnAddServices).toBeFalsy();
  });

  it('should set newService null improve services with provided service and isServiceLoading to true on successOnAddService', () => {
    const currentState = setupInitialState();
    const newService = setupService('12345789');
    currentState.isServiceLoading = true
    currentState.services = []
    currentState.newService = newService;

    const state = servicesReducer(currentState, servicesPageActions.successOnAddService({ service: newService }));

    expect(state.newService).toBeNull();
    expect(state.isServiceLoading).toBeFalsy();
    expect(state.errorOnAddServices).toBeFalsy();
    expect(state.services).toHaveLength(1);
    expect(state.services.at(0)).toEqual(newService);
  });

  it('should set errorOnAddService to true and isServiceLoading to false on errorOnAddService', () => {
    const currentState = setupInitialState();
    const newService = setupService('12345789');
    currentState.isServiceLoading = true
    currentState.errorOnAddServices = false
    currentState.newService = newService;

    const state = servicesReducer(currentState, servicesPageActions.errorOnAddService());

    expect(state.newService).toEqual(newService);
    expect(state.isServiceLoading).toBeFalsy();
    expect(state.errorOnAddServices).toBeTruthy();
  });

  it('should set errorOnEditServices to false and isServiceLoading to true on editService', () => {
    const currentState = setupInitialState();
    const editedService = setupService('1');
    editedService.title = 'new_title';

    currentState.isServiceLoading = false
    currentState.errorOnEditServices = true
    currentState.selectedService = null
    currentState.selectedServiceId = undefined

    const state = servicesReducer(currentState, servicesPageActions.editService({ service: editedService }));

    expect(state.isServiceLoading).toBeTruthy();
    expect(state.errorOnAddServices).toBeFalsy();
    expect(state.selectedService).toEqual(editedService);
    expect(state.selectedServiceId).toBe(editedService.id);
  });

  it('should set update services list with editedService and isServiceLoading to false on successOnEditService', () => {
    const currentState = setupInitialState();
    const editedService = setupService('1');
    editedService.title = 'new_title';

    currentState.isServiceLoading = true;
    currentState.selectedService = editedService;
    currentState.selectedServiceId = editedService.id;

    const state = servicesReducer(currentState, servicesPageActions.successOnEditService({ service: editedService }));

    expect(state.isServiceLoading).toBeFalsy();
    expect(state.services.find(service => service.id === '1')).toEqual(editedService);
  });

  it('should set errorOnEditServices to true and isServiceLoading to false on errorOnEditService', () => {
    const currentState = setupInitialState();

    currentState.isServiceLoading = true;
    currentState.errorOnEditServices = false;

    const state = servicesReducer(currentState, servicesPageActions.errorOnEditService());

    expect(state.isServiceLoading).toBeFalsy();
    expect(state.errorOnEditServices).toBeTruthy();
  });

  it('should set errorOnDeleteServices to false and isServiceLoading to true on deleteService', () => {
    const currentState = setupInitialState();

    currentState.isServiceLoading = false;
    currentState.errorOnDeleteServices = true;

    const state = servicesReducer(currentState, servicesPageActions.deleteService());

    expect(state.isServiceLoading).toBeTruthy();
    expect(state.errorOnDeleteServices).toBeFalsy();
  });

  it('should set selectedService to null and isServiceLoading to false on successOnDeleteService', () => {
    const currentState = setupInitialState();

    currentState.isServiceLoading = true;
    currentState.selectedService = currentState.services.at(0) as CompanyServicesModel;
    const currentServiceSize = currentState.services.length
    const state = servicesReducer(currentState, servicesPageActions.successOnDeleteService());

    expect(state.isServiceLoading).toBeFalsy();
    expect(state.selectedService).toBeNull();
    expect(state.services).toHaveLength(currentServiceSize - 1);
  });

  it('should set isServiceLoading to false on errorOnDeleteService', () => {
    const currentState = setupInitialState();

    currentState.isServiceLoading = true;
    const currentServiceSize = currentState.services.length
    const state = servicesReducer(currentState, servicesPageActions.errorOnDeleteService());

    expect(state.isServiceLoading).toBeFalsy();
    expect(state.services).toHaveLength(currentServiceSize);
  });
});

function setupService(id?: string): CompanyServicesModel {
  return {
    id,
    title: 'title',
    description: 'description',
    value: 1000,
    isActive: true
  }
}

function setupInitialState(): CompanyServicesState {
  return {
    services: [setupService('1'), setupService('2'), setupService('3')],
    newService: null,
    selectedService: null,
    isServiceLoading: false,
    errorOnAddServices: false,
    errorOnEditServices: false,
    errorOnDeleteServices: false,
    errorOnLoadServices: false
  }
}


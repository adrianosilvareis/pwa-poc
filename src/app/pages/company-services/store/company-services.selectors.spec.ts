import { AppState } from "@root/app/app-state";
import { CompanyServicesModel } from "../model/company-services.model";
import { isServiceLoading, newService, selectActiveServices, selectedService, selectedServiceId } from "./company-services.selectors";
import { CompanyServicesState } from "./company-services.reducer";

describe("Service Selectors", () => {
  const initialState: Partial<AppState> = setupInitialStatus();

  it("should return newService", () => {
    const result = newService(initialState);
    expect(result).toEqual(setupService());
  });

  it("should return isServiceLoading", () => {
    const result = isServiceLoading(initialState);
    expect(result).toBeFalsy();
  });

  it("should return selectedService", () => {
    const result = selectedService(initialState);
    expect(result).toEqual(setupService());
  });

  it("should return selectedServiceId", () => {
    const result = selectedServiceId(initialState);
    expect(result).toEqual('MY_ID');
  });

  it("should return selectActiveServices", () => {
    const result = selectActiveServices(initialState);
    expect(result).toEqual(initialState.service?.services);
  });
});


function setupService(): CompanyServicesModel {
  return {
    id: 'MY_ID',
    title: 'title',
    description: 'description',
    value: 1000,
    isActive: true,
  }
}

function setupInitialStatus():{ service: CompanyServicesState } {
  return {
    service: {
      services: [setupService()],
      newService: setupService(),
      selectedService: setupService(),
      selectedServiceId: 'MY_ID',
      isServiceLoading: false,
      errorOnAddServices: false,
      errorOnEditServices: false,
      errorOnDeleteServices: false,
      errorOnLoadServices: false
    }
  }
}

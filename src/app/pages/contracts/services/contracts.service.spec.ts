import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Subscription } from "rxjs";
import { ContractsService } from "./contracts.service";
import { ContractsModel } from "../model/contracts.models";
import MockDate from 'mockdate'

describe('ContractsService', () => {
  let httpMock: HttpTestingController;
  let contract: ContractsService;
  const subscription = new Subscription();

  afterAll(() => {
    subscription.unsubscribe();
  });

  beforeAll(() => {
    MockDate.set(new Date())
  });

  afterAll(() => {
    MockDate.reset();
  });

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ContractsService]
      });
      httpMock = TestBed.inject(HttpTestingController);
      contract = TestBed.inject(ContractsService);
  });

  it('should call a correct url of loadContracts', () => {
    subscription.add(contract.loadContracts().subscribe());
    const request = httpMock.expectOne(contract.ROOT_URL + '/contracts');
    expect(request.request.method).toBe('GET');
  });

  it('should call a correct url of getContracts', () => {
    subscription.add(contract.getContractById('123456789').subscribe());
    const request = httpMock.expectOne(contract.ROOT_URL + '/contracts/123456789');
    expect(request.request.method).toBe('GET');
  });

  it('should call a correct url of addContract', () => {
    subscription.add(contract.addContracts(setupContract()).subscribe());
    const request = httpMock.expectOne(contract.ROOT_URL + '/contracts');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(setupContract());
  });

  it('should call a correct url of editContract', () => {
    subscription.add(contract.editContracts(setupContract('123456789')).subscribe());
    const request = httpMock.expectOne(contract.ROOT_URL + '/contracts/123456789');
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(setupContract('123456789'));
  });

  it('should call a correct url of deleteContract', () => {
    subscription.add(contract.deleteContracts(setupContract('123456789')).subscribe());
    const request = httpMock.expectOne(contract.ROOT_URL + '/contracts/123456789');
    expect(request.request.method).toBe('DELETE');
  });

  afterEach(() => httpMock.verify());
});

function setupContract(id?: string): ContractsModel {
  return {
    id,
    startDate: new Date(),
    endDate: new Date(),
    renewable: true,
    price: 1000,
    services: [],
    isActive: true
  }
}

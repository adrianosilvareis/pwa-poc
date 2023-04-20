import { Subscription } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClientsService } from "./clients.service";
import { TestBed } from '@angular/core/testing';

describe('ClientsService', () => {
  let httpMock: HttpTestingController;
  let service: ClientsService;
  const subscription = new Subscription();

  afterAll(() => {
    subscription.unsubscribe();
  });

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ClientsService]
      });
      httpMock = TestBed.inject(HttpTestingController);
      service = TestBed.inject(ClientsService);
  });

  it('should call a correct url of loadClients', () => {
    subscription.add(service.loadClients().subscribe());
    const request = httpMock.expectOne(service.ROOT_URL + '/clients');
    expect(request.request.method).toBe('GET');
  });

  it('should call a correct url of getClients', () => {
    subscription.add(service.getClientById('123456789').subscribe());
    const request = httpMock.expectOne(service.ROOT_URL + '/clients/123456789');
    expect(request.request.method).toBe('GET');
  });

  it('should call a correct url of addClient', () => {
    subscription.add(service.addClients(setupClient()).subscribe());
    const request = httpMock.expectOne(service.ROOT_URL + '/clients');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(setupClient());
  });

  it('should call a correct url of editClient', () => {
    subscription.add(service.editClients(setupClient('123456789')).subscribe());
    const request = httpMock.expectOne(service.ROOT_URL + '/clients/123456789');
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(setupClient('123456789'));
  });

  it('should call a correct url of deleteClient', () => {
    subscription.add(service.deleteClients(setupClient('123456789')).subscribe());
    const request = httpMock.expectOne(service.ROOT_URL + '/clients/123456789');
    expect(request.request.method).toBe('DELETE');
  });

  afterEach(() => httpMock.verify());
});

function setupClient(id?: string) {
  return {
    id: id,
    name: 'name',
    owner: 'owner',
    responsible: 'responsible',
    description: 'description',
    area: 'area',
    contacts: ['contacts'],
    contracts: ['contracts'],
    payments: ['payments'],
    isActive: true,
  }
}

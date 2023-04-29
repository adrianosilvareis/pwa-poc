import { Subscription } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CompanyServicesService } from './company-services.service';

describe('CompanyServicesService', () => {
  let httpMock: HttpTestingController;
  let service: CompanyServicesService;
  const subscription = new Subscription();

  afterAll(() => {
    subscription.unsubscribe();
  });

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [CompanyServicesService]
      });
      httpMock = TestBed.inject(HttpTestingController);
      service = TestBed.inject(CompanyServicesService);
  });

  it('should call a correct url of loadServices', () => {
    subscription.add(service.loadServices().subscribe());
    const request = httpMock.expectOne(service.ROOT_URL + '/services');
    expect(request.request.method).toBe('GET');
  });

  it('should call a correct url of getServices', () => {
    subscription.add(service.getServiceById('123456789').subscribe());
    const request = httpMock.expectOne(service.ROOT_URL + '/services/123456789');
    expect(request.request.method).toBe('GET');
  });

  it('should call a correct url of addService', () => {
    subscription.add(service.addServices(setupService()).subscribe());
    const request = httpMock.expectOne(service.ROOT_URL + '/services');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(setupService());
  });

  it('should call a correct url of editService', () => {
    subscription.add(service.editServices(setupService('123456789')).subscribe());
    const request = httpMock.expectOne(service.ROOT_URL + '/services/123456789');
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(setupService('123456789'));
  });

  it('should call a correct url of deleteService', () => {
    subscription.add(service.deleteServices(setupService('123456789')).subscribe());
    const request = httpMock.expectOne(service.ROOT_URL + '/services/123456789');
    expect(request.request.method).toBe('DELETE');
  });

  afterEach(() => httpMock.verify());
});

function setupService(id?: string) {
  return {
    id,
    title: 'title',
    description: 'description',
    value: 1000,
    isActive: true,
  }
}

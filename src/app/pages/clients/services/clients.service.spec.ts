import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClientsService } from "./clients.service";
import { TestBed } from '@angular/core/testing';

describe('ClientsService', () => {
  let httpMock: HttpTestingController;
  let service: ClientsService;

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ClientsService]
      });
      httpMock = TestBed.inject(HttpTestingController);
      service = TestBed.inject(ClientsService);
  });

  it('should call a correct url', () => {
    service.loadClients().subscribe();
    const request = httpMock.expectOne(service.ROOT_URL + '/clients');
    expect(request.request.method).toBe('GET');
  });

  afterEach(() => httpMock.verify());
});

import { environment } from '@root/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyServicesModel } from '../model/company-services.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyServicesService {
  public ROOT_URL = environment.baseUrl;
  private baseUrl = `${this.ROOT_URL}/services`;

  constructor(private httpClient: HttpClient) { }

  loadServices() {
    return this.httpClient.get<CompanyServicesModel[]>(this.baseUrl);
  }

  getServiceById(clientId: string) {
    return this.httpClient.get<CompanyServicesModel>(`${this.baseUrl}/${clientId}`);
  }

  addServices(client: CompanyServicesModel) {
    return this.httpClient.post<CompanyServicesModel>(this.baseUrl, client);
  }

  editServices(client: CompanyServicesModel) {
    return this.httpClient.put<CompanyServicesModel>(`${this.baseUrl}/${client.id}`, client);
  }

  deleteServices(client: CompanyServicesModel) {
    return this.httpClient.delete<CompanyServicesModel>(`${this.baseUrl}/${client.id}`);
  }
}

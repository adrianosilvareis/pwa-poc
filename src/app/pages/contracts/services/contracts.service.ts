import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@root/environments/environment';
import { ContractsModel } from '@pages/contracts/model/contracts.models';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {
  public ROOT_URL = environment.baseUrl;
  private baseUrl = `${this.ROOT_URL}/contracts`;

  constructor(private httpClient: HttpClient) { }

  loadContracts() {
    return this.httpClient.get<ContractsModel[]>(this.baseUrl);
  }

  getContractById(clientId: string) {
    return this.httpClient.get<ContractsModel>(`${this.baseUrl}/${clientId}`);
  }

  addContracts(client: ContractsModel) {
    return this.httpClient.post<ContractsModel>(this.baseUrl, client);
  }

  editContracts(client: ContractsModel) {
    return this.httpClient.put<ContractsModel>(`${this.baseUrl}/${client.id}`, client);
  }

  deleteContracts(client: ContractsModel) {
    return this.httpClient.delete<ContractsModel>(`${this.baseUrl}/${client.id}`);
  }
}

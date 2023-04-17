import { environment } from '@root/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientModel } from '@pages/clients/model/Clients.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  public ROOT_URL = environment.baseUrl

  constructor(private httpClient: HttpClient) { }

  loadClients() {
    return this.httpClient.get<ClientModel[]>(`${this.ROOT_URL}/clients`);
  }

  addClients(client: ClientModel) {
    return this.httpClient.post<ClientModel>(`${this.ROOT_URL}/clients`, client);
  }

  editClients(client: ClientModel) {
    return this.httpClient.put<ClientModel>(`${this.ROOT_URL}/clients/${client.id}`, client);
  }

  deleteClients(client: ClientModel) {
    return this.httpClient.delete<ClientModel>(`${this.ROOT_URL}/clients/${client.id}`);
  }
}

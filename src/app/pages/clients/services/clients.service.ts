import { environment } from '@root/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientModel } from '@pages/clients/model/Clients.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  public ROOT_URL = environment.baseUrl
  private baseUrl = `${this.ROOT_URL}/clients`

  constructor(private httpClient: HttpClient) { }

  loadClients() {
    return this.httpClient.get<ClientModel[]>(this.baseUrl);
  }

  getClientById(clientId: string) {
    return this.httpClient.get<ClientModel>(`${this.baseUrl}/${clientId}`);
  }

  addClients(client: ClientModel) {
    return this.httpClient.post<ClientModel>(this.baseUrl, client);
  }

  editClients(client: ClientModel) {
    return this.httpClient.put<ClientModel>(`${this.baseUrl}/${client.id}`, client);
  }

  deleteClients(client: ClientModel) {
    return this.httpClient.delete<ClientModel>(`${this.baseUrl}/${client.id}`);
  }
}

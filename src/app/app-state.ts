import { ClientState } from "./pages/clients/store/clients.reducer";
import { CompanyServicesState } from "./pages/company-services/store/company-services.reducer";

export interface AppState {
  client: ClientState,
  service: CompanyServicesState
}

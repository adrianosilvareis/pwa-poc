import { ClientState } from "./pages/clients/store/clients.reducer";
import { CompanyServicesState } from "./pages/company-services/store/company-services.reducer";
import { ContractsState } from "./pages/contracts/store/contracts.reducer";

export interface AppState {
  client: ClientState,
  service: CompanyServicesState,
  contract: ContractsState,
}

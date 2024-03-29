import { CompanyServicesModel } from "@pages/company-services/model/company-services.model";

export interface ContractsModel {
  id?: string;
  client: string;
  startDate: Date;
  endDate: Date;
  renewable: boolean;
  services: CompanyServicesModel[];
  price: number;
  suggestedValue: number;
  discount: number;
  isActive: boolean;
}

import { CompanyServicesModel } from "../../company-services/model/company-services.model";

export interface ContractsModel {
  id?: string;
  startDate: Date;
  endDate: Date;
  renewable: boolean;
  services: CompanyServicesModel[];
  price: number;
  isActive: boolean;
}

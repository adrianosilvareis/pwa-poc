import { CompanyServicesModel } from "@pages/company-services/model/company-services.model";

export interface ContractsModel {
  id?: string;
  startDate: Date;
  endDate: Date;
  renewable: boolean;
  services: CompanyServicesModel[];
  price: number;
  isActive: boolean;
}

export interface ContractsData {
  id?: string;
  startDate: Date;
  endDate: Date;
  renewable: boolean;
  services: string[];
  price: number;
  isActive?: boolean;
}

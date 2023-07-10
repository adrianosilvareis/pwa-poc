import { CompanyServicesModel } from "@pages/company-services/model/company-services.model";
import { OptionsType } from "@root/app/shared/components/form/items.model";

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
  services: OptionsType[];
  price: number;
}

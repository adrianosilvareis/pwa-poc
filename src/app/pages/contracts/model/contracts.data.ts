export interface ContractsData {
  id?: string;
  startDate: Date;
  endDate: Date;
  renewable: boolean;
  services: string[];
  price: number;
  isActive?: boolean;
}

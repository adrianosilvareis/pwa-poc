export interface ContractsData {
  id?: string;
  client: string;
  startDate: Date;
  endDate: Date;
  renewable: boolean;
  services: string[];
  price: number;
  suggestedValue: number;
  discount: number;
  isActive?: boolean;
}

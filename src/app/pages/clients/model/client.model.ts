export interface ClientModel {
  id?: string;
  name: string;
  owner: string;
  responsible: string;
  description: string;
  area: string;
  contacts?: unknown[];
  contracts?: unknown[];
  payments?: unknown[];
  isActive?: boolean;
}

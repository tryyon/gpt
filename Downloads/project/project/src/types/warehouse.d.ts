export interface Organization {
  name: string;
  status: 'pending' | 'approved' | 'not approved';
}

export interface WarehouseData {
  warehousePincode: string;
  warehouseGSTIN: string;
  warehouseAddress: string;
  city: string;
  state: string;
  country: string;
  warehouseEmailID: string;
  warehouseContactNumber: string;
  operationStartTime: string;
  operationEndTime: string;
  perDayOrderProcessingCapacity: number;
  documents?: File[];
  organizations: Organization[];
}

export interface FormData {
  warehouses: WarehouseData[];
}
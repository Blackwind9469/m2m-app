interface CustomerData {
  id: string;
  name: string;
  serial: string;
  represent: string;
  contact: string;
  deleted: boolean;
  created_at: Date;
}

interface CustomerRow {
  customer?: CustomerData | null;
  error?: string;
}

interface CustomerList {
  customers?: CustomerData[];
  error?: string;
}

export type {
  CustomerData, CustomerList, CustomerRow
}
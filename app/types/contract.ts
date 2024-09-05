interface ContractData {
 
  id:            string
  deleted:       Boolean
  sim_id:        string
  customer_id:   string
  device_id:     string
  type:          string
  license_plate: string   
  start:         Date
  finish:        Date
  created_at:    Date
  updated_at:    Date
}

interface ContractRow {
  contract?: ContractData | null;
  error?: string;
}

interface ContractList {
  contracts?: ContractData[];
  error?: string;
}

export type {
  ContractData, ContractList, ContractRow
}
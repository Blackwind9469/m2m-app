interface SimData {
  id: string;
  serial: string;
  gsmno: string;
  tariff: string;
  deleted: boolean;
  used: boolean;
  created_at: Date;
}

interface SimRow {
  sim?: SimData | null;
  error?: string;
}

interface SimList {
  sims?: SimData[];
  error?: string;
}

export type {
  SimData, SimList, SimRow
}
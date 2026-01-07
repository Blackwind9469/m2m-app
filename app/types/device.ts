interface DeviceData {
    id: string;
    serial: string;
    type: string;
    deleted: boolean;
    used: boolean;
    created_at: Date;
  }
  
  interface DeviceRow {
    device?: DeviceData | null;
    error?: string;
  }
  
  interface DeviceList {
    devices?: DeviceData[];
    error?: string;
  }
  
  export type {
    DeviceData, DeviceList, DeviceRow
  }
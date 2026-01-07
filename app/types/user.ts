interface UserData {
    id: string;
    name: string;
    phone: string;
    deleted: boolean;
    created_at: Date;
  }
  
  interface UserRow {
    user?: UserData | null;
    error?: string;
  }
  
  interface UserList {
    users?: UserData[];
    error?: string;
  }
  
  export type {
    UserData, UserList, UserRow
  }
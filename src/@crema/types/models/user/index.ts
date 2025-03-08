export interface User {
    id: number;
    name: string;
    gender: 'M' | 'F';
    email: string;
    department: string;
    year: string;
    phone: string;
    status: 'Active' | 'Idle' | 'Dropout';
  }
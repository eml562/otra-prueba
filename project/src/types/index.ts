export interface Customer {
  id: string;
  name: string;
  taxId: string;  // For CIF/DNI
  email: string;
  address: string;
  phone: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  customer: Customer;
  items: InvoiceItem[];
  subtotal: number;
  irpf: number;
  total: number;
  status: 'draft' | 'pending' | 'paid';
}
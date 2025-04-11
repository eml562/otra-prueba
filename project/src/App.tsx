import React, { useState } from 'react';
import { Receipt } from 'lucide-react';
import InvoiceForm from './components/InvoiceForm';
import { InvoicePDF } from './components/InvoicePDF';
import CustomerList from './components/CustomerList';
import type { Invoice, Customer } from './types';

function App() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showCustomers, setShowCustomers] = useState(false);

  const getNextInvoiceNumber = () => {
    const currentYear = new Date().getFullYear();
    const yearInvoices = invoices.filter(inv => inv.number.startsWith(`${currentYear}/`));
    const nextNumber = yearInvoices.length + 1;
    return `${currentYear}/${nextNumber.toString().padStart(4, '0')}`;
  };

  const handleCreateInvoice = (invoice: Invoice) => {
    const invoiceWithNumber = {
      ...invoice,
      number: getNextInvoiceNumber(),
    };
    setInvoices([...invoices, invoiceWithNumber]);
    setSelectedInvoice(invoiceWithNumber);
  };

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowCustomers(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Receipt className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Sistema de Facturación</h1>
            </div>
            <button
              onClick={() => setShowCustomers(!showCustomers)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {showCustomers ? 'Crear Factura' : 'Gestionar Clientes'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {showCustomers ? (
          <CustomerList onSelectCustomer={handleSelectCustomer} />
        ) : (
          <>
            <InvoiceForm 
              onSubmit={handleCreateInvoice} 
              initialCustomer={selectedCustomer}
            />
            
            {selectedInvoice && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Vista Previa PDF</h2>
                <InvoicePDF invoice={selectedInvoice} />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
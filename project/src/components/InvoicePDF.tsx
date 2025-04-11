import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import type { Invoice } from '../types';
import { fiscalInfo } from '../config/fiscalInfo';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  fiscalInfo: {
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: '#999',
    paddingBottom: 10,
  },
  invoiceInfo: {
    marginBottom: 20,
  },
  customerInfo: {
    marginBottom: 20,
  },
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  description: { width: '50%' },
  quantity: { width: '15%' },
  price: { width: '15%' },
  total: { width: '20%' },
  totals: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  totalRow: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  totalLabel: {
    width: 100,
  },
  totalValue: {
    width: 100,
    textAlign: 'right',
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
  },
});

interface InvoicePDFProps {
  invoice: Invoice;
}

export function InvoicePDF({ invoice }: InvoicePDFProps) {
  return (
    <PDFViewer style={{ width: '100%', height: '600px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.fiscalInfo}>
            <Text style={styles.bold}>{fiscalInfo.name}</Text>
            <Text>NIF/CIF: {fiscalInfo.taxId}</Text>
            <Text>{fiscalInfo.address}</Text>
            <Text>{fiscalInfo.postalCode} {fiscalInfo.city}</Text>
            <Text>Tel: {fiscalInfo.phone}</Text>
            <Text>Email: {fiscalInfo.email}</Text>
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>FACTURA</Text>
            <Text>Número: {invoice.number}</Text>
            <Text>Fecha: {invoice.date}</Text>
            <Text>Vencimiento: {invoice.dueDate}</Text>
          </View>

          <View style={styles.customerInfo}>
            <Text style={styles.bold}>Cliente:</Text>
            <Text>{invoice.customer.name}</Text>
            <Text>CIF/DNI: {invoice.customer.taxId}</Text>
            <Text>{invoice.customer.address}</Text>
            <Text>Email: {invoice.customer.email}</Text>
            <Text>Teléfono: {invoice.customer.phone}</Text>
          </View>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.description}>Descripción</Text>
              <Text style={styles.quantity}>Cantidad</Text>
              <Text style={styles.price}>Precio</Text>
              <Text style={styles.total}>Total</Text>
            </View>

            {invoice.items.map((item) => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <Text style={styles.price}>{item.price.toFixed(2)}€</Text>
                <Text style={styles.total}>
                  {(item.quantity * item.price).toFixed(2)}€
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.totals}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal:</Text>
              <Text style={styles.totalValue}>{invoice.subtotal.toFixed(2)}€</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>IRPF (15%):</Text>
              <Text style={styles.totalValue}>-{invoice.irpf.toFixed(2)}€</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>{invoice.total.toFixed(2)}€</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
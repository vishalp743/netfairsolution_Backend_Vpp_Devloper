import React, { useState } from 'react';

const TransactionTracker = () => {
  const [pendingTransactions, setPendingTransactions] = useState([
    { id: 1, transactionId: 'TRX001', date: '2024-07-03', amount: 100.00, paymentType: 'Credit Card' },
    { id: 2, transactionId: 'TRX002', date: '2024-07-04', amount: 250.50, paymentType: 'Bank Transfer' },
    { id: 3, transactionId: 'TRX003', date: '2024-07-05', amount: 75.25, paymentType: 'PayPal' },
  ]);

  const [completedTransactions, setCompletedTransactions] = useState([]);

  const handleResolve = (transaction) => {
    setPendingTransactions(pendingTransactions.filter(t => t.id !== transaction.id));
    setCompletedTransactions([...completedTransactions, { ...transaction, resolvedDate: new Date().toISOString().split('T')[0] }]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Transaction Tracker</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={tableHeaderStyle}>Serial No.</th>
            <th style={tableHeaderStyle}>Transaction ID</th>
            <th style={tableHeaderStyle}>Date</th>
            <th style={tableHeaderStyle}>Amount</th>
            <th style={tableHeaderStyle}>Payment Type</th>
            
          </tr>
        </thead>
        <tbody>
          {pendingTransactions.map((transaction, index) => (
            <tr key={transaction.id}>
              <td style={tableCellStyle}>{index + 1}</td>
              <td style={tableCellStyle}>{transaction.transactionId}</td>
              <td style={tableCellStyle}>{transaction.date}</td>
              <td style={tableCellStyle}>${transaction.amount.toFixed(2)}</td>
              <td style={tableCellStyle}>{transaction.paymentType}</td>
              
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

const tableHeaderStyle = {
  padding: '12px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd'
};

const tableCellStyle = {
  padding: '12px',
  borderBottom: '1px solid #ddd'
};

const buttonStyle = {
  padding: '5px 10px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default TransactionTracker;
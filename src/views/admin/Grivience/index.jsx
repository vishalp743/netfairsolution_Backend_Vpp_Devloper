import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GrievanceTracker = () => {
  const [openGrievances, setOpenGrievances] = useState([]);
  const [resolvedGrievances, setResolvedGrievances] = useState([]);

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    try {
      const response = await axios.get('http://localhost:5000/grievances');
      const grievances = response.data;
      console.log("Hello");
      setOpenGrievances(grievances.filter(g => !g.isRead));
      setResolvedGrievances(grievances.filter(g => g.isRead));
    } catch (error) {
      console.error('Error fetching grievances:', error);
    }
  };

  const handleResolve = async (grievance) => {
    try {
      await axios.put(`http://localhost:5000/grievances/${grievance._id}/resolve`);
      fetchGrievances(); // Refresh the data
    } catch (error) {
      console.error('Error resolving grievance:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Grievance Tracker</h1>
      
      <h2>Open Grievances</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Message</th>
            <th style={tableHeaderStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {openGrievances.map(grievance => (
            <tr key={grievance._id}>
              <td style={tableCellStyle}>{grievance.name}</td>
              <td style={tableCellStyle}>{grievance.email}</td>
              <td style={tableCellStyle}>{grievance.message}</td>
              <td style={tableCellStyle}>
                <button onClick={() => handleResolve(grievance)} style={buttonStyle}>
                  Resolve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Resolved Grievances</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Message</th>
          </tr>
        </thead>
        <tbody>
          {resolvedGrievances.map(grievance => (
            <tr key={grievance._id}>
              <td style={tableCellStyle}>{grievance.name}</td>
              <td style={tableCellStyle}>{grievance.email}</td>
              <td style={tableCellStyle}>{grievance.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ... (keep the styles as they were)



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

export default GrievanceTracker;
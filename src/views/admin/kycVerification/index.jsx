import React, { useState, useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import './index.css'; // Create and import a separate CSS file for custom styles

const UserDetails = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [kycDetails, setKYCDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [popupImage, setPopupImage] = useState(null);

  // Fetch user emails on component mount
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch('https://netfairsolution-backend-vpp-devloper.onrender.com/getUserEmails');
        const data = await response.json();
        setEmails(data.emails);
      } catch (error) {
        console.error('Error fetching user emails:', error);
      }
    };
    fetchEmails();
  }, []);

  // Fetch KYC details when selectedEmail changes
  useEffect(() => {
    const fetchKYCDetails = async () => {
      if (selectedEmail) {
        try {
          setLoading(true);
          const response = await fetch(`https://netfairsolution-backend-vpp-devloper.onrender.com/getKYCDetailsByEmail?email=${selectedEmail}`);
          const data = await response.json();
          setKYCDetails(data.kycDetails);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching KYC details:', error);
          setLoading(false);
        }
      }
    };
    fetchKYCDetails();
  }, [selectedEmail]);

  // Handle verification button click
  const handleVerify = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://netfairsolution-backend-vpp-devloper.onrender.com/verifyKYC', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: selectedEmail }),
      });
      const data = await response.json();
      setKYCDetails(data.kycDetails);
      setLoading(false);
      toast.success('KYC Verification Successful'); // Display success toast
    } catch (error) {
      console.error('Error verifying KYC:', error);
      setLoading(false);
      toast.error('Failed to verify KYC'); // Display error toast
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <h2>User KYC Details</h2>
      <select className="select" value={selectedEmail} onChange={(e) => setSelectedEmail(e.target.value)}>
        <option value="">Select Email</option>
        {emails ? (
          emails.map((email) => (
            <option key={email} value={email}>{email}</option>
          ))
        ) : (
          <option value="" disabled>No emails found</option>
        )}
      </select>
      {loading && <p className="loading">Loading...</p>}
      {!loading && Object.keys(kycDetails).length > 0 && (
        <div className="details">
          <h3>Business Name: {kycDetails.businessName}</h3>
          <table className="details-table">
            <tbody>
              <tr>
                <td>Email</td>
                <td>{kycDetails.email}</td>
              </tr>
              <tr>
                <td>Business Address</td>
                <td>{kycDetails.registeredAddress}</td>
              </tr>
              {/* Display other KYC details */}
              {Object.keys(kycDetails).map((key) => {
                if (key !== 'email' && key !== 'registeredAddress' && key !== 'panDocument') {
                  return (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{kycDetails[key]}</td>
                    </tr>
                  );
                }
                return null;
              })}
              {/* Display PAN document image if available */}
              {kycDetails.panDocument && (
                <tr>
                  <td>PAN Document</td>
                  <td>
                    <img
                      src={`https://netfairsolution-vpp-devloper.onrender.com/${kycDetails.panDocument}`}
                      alt="PAN Document"
                      className="document-image"
                      onClick={() => setPopupImage(`https://netfairsolution-vpp-devloper.onrender.com/${kycDetails.panDocument}`)}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {popupImage && (
            <div className="popup" onClick={() => setPopupImage(null)}>
              <img src={popupImage} alt="Document" className="popup-image" />
            </div>
          )}
          <button className="button" onClick={handleVerify} disabled={loading}>
            {kycDetails.kycverification ? 'Verified' : 'Verify KYC'}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDetails;

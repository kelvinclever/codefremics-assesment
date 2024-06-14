import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CustomerProfile.css';

const CustomerProfile = () => {
  const { customer_id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const accessToken = user?.access_token;
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        console.log("Fetching customer details for ID:", customer_id);
        const response = await axios.get(`https://stemprotocol.codefremics.com/api/v2/customers/get-customer-details/${customer_id}`, config);
        console.log("Customer Details Response:", response.data);
        setCustomer(response.data.response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customer details:", error);
        setError(error.response?.data?.msg || "Something went wrong");
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [customer_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="customer-profile">
      <h2>Customer Profile</h2>
      <p><strong>First Name:</strong> {customer.first_name}</p>
      <p><strong>Other Names:</strong> {customer.other_names}</p>
      <p><strong>Gender:</strong> {customer.gender}</p>
      <p><strong>Mobile Number:</strong> {customer.mobile}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Description:</strong> {customer.description}</p>
    </div>
  );
};

export default CustomerProfile;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CustomerList.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const accessToken = user?.access_token;
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.get('https://stemprotocol.codefremics.com/api/v2/customers/get-merchant-customers/1', config);
        console.log("Customers Response:", response.data);
        if (response.data && Array.isArray(response.data.response)) {
          setCustomers(response.data.response);
          setFilteredCustomers(response.data.response);
        } else {
          console.error('API response is not as expected:', response.data);
          setCustomers([]);
          setFilteredCustomers([]);
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
        setCustomers([]);
        setFilteredCustomers([]);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const results = customers.filter(customer =>
      customer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.other_names.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.number.toString().includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(results);
  }, [searchTerm, customers]);

  const handleRowClick = (customer_id) => {
    console.log("Navigating to customer profile with ID:", customer_id);
    navigate(`/customer-profile/${customer_id}`);
  };

  return (
    <div className="customer-list-container">
      <h2>Customer List</h2>
      <input
        type="text"
        placeholder="Search by name, mobile number or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <table className="customer-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Other Names</th>
            <th>Gender</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer, index) => (
            <tr key={index} onClick={() => handleRowClick(customer.customer_id)} className="clickable-row">
              <td>{customer.first_name}</td>
              <td>{customer.other_names}</td>
              <td>{customer.gender}</td>
              <td>{customer.number}</td>
              <td>{customer.email}</td>
              <td>{customer.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;

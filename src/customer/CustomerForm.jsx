import React, { useState, useEffect } from "react";
import axios from "axios";
import "./customerform.css";

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    other_names: "",
    gender: "",
    mobile_number: "",
    email: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = "https://stemprotocol.codefremics.com/api/v2/customers/create";
      const user = JSON.parse(localStorage.getItem("user"));
      const accessToken = user?.access_token;
      console.log("Access Token:", accessToken);
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      console.log("Form Data:", formData);
      const response = await axios.post(apiUrl, formData, config);
      setLoading(false);
      setSuccessMessage(response.data.description);
      setFormData({
        first_name: "",
        other_names: "",
        gender: "",
        mobile_number: "",
        email: "",
        description: "",
      });

      // Clear the success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);

    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="hero">
      <h2>Create a New Customer</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Other Names:
          <input
            type="text"
            name="other_names"
            value={formData.other_names}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Mobile Number:
          <input
            type="text"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Create Customer"}
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;

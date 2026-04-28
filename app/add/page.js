"use client";

// Import React hook for state management
import { useState } from "react";

// Import Link for navigation
import Link from "next/link";

export default function AddPage() {
  // State to display success or error message
  const [message, setMessage] = useState("");

  // Function triggered when form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Collect form data
    const form = new FormData(e.target);

    // Create data object to send to API
    const data = {
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      address: form.get("address"),
      mobile: form.get("mobile"),
      email: form.get("email"),
      eircode: form.get("eircode"),
      applianceType: form.get("applianceType"),
      brand: form.get("brand"),
      modelNumber: form.get("modelNumber"),
      serialNumber: form.get("serialNumber"),
      purchaseDate: form.get("purchaseDate"),
      warrantyDate: form.get("warrantyDate"),
      cost: form.get("cost"),
    };

    // Send POST request to API route
    const res = await fetch("/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Convert response to JSON
    const result = await res.json();

    // Show success or error message
    setMessage(result.message || result.error);
  };

  return (
    <main>
      {/* Page title */}
      <h1>Add Appliance</h1>

      {/* Form for user and appliance data */}
      <form onSubmit={handleSubmit}>
        
        {/* User details section */}
        <h2>User Details</h2>

        <input name="firstName" placeholder="First Name" required />
        <input name="lastName" placeholder="Last Name" required />
        <input name="address" placeholder="Address" required />
        <input name="mobile" placeholder="Mobile" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="eircode" placeholder="Eircode" required />

        {/* Appliance details section */}
        <h2>Appliance Details</h2>

        {/* Dropdown for predefined appliance types */}
        <select name="applianceType" required>
          <option value="">Select Appliance Type</option>
          <option value="Fridge">Fridge</option>
          <option value="Washing Machine">Washing Machine</option>
          <option value="Microwave">Microwave</option>
          <option value="Oven">Oven</option>
          <option value="Dishwasher">Dishwasher</option>
          <option value="Television">Television</option>
        </select>

        <input name="brand" placeholder="Brand" required />
        <input name="modelNumber" placeholder="Model Number" required />
        <input name="serialNumber" placeholder="Serial Number" required />
        
        {/* Date inputs */}
        <input name="purchaseDate" type="date" required />
        <input name="warrantyDate" type="date" required />
        
        {/* Cost input with decimal support */}
        <input name="cost" type="number" step="0.01" placeholder="Cost" required />

        {/* Submit button */}
        <button type="submit">Add Appliance</button>
      </form>

      {/* Display response message */}
      <p>{message}</p>

      {/* Navigation back to homepage */}
      <Link href="/">Back to Home</Link>
    </main>
  );
}
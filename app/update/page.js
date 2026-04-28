"use client";

import { useState } from "react";
import Link from "next/link";

export default function UpdatePage() {
  // State for form fields and message
  const [form, setForm] = useState({
    serialNumber: "",
    brand: "",
    modelNumber: "",
    cost: ""
  });

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle update request
  const handleUpdate = async () => {
    const res = await fetch("/api/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <main>
      <h1>Update Appliance</h1>

      {/* Input fields */}
      <input
        name="serialNumber"
        placeholder="Serial Number"
        onChange={handleChange}
      />
      <input
        name="brand"
        placeholder="New Brand"
        onChange={handleChange}
      />
      <input
        name="modelNumber"
        placeholder="New Model Number"
        onChange={handleChange}
      />
      <input
        name="cost"
        placeholder="New Cost"
        type="number"
        onChange={handleChange}
      />

      <button onClick={handleUpdate}>Update</button>

      {/* Show result */}
      <p>{message}</p>

      <Link href="/">Back to Home</Link>
    </main>
  );
}
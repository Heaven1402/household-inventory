"use client";

import { useState } from "react";
import Link from "next/link";

export default function DeletePage() {
  // State for serial number and response message
  const [serialNumber, setSerialNumber] = useState("");
  const [message, setMessage] = useState("");

  // Handle delete request
  const handleDelete = async () => {
    const res = await fetch("/api/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ serialNumber }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <main>
      <h1>Delete Appliance</h1>

      {/* Serial number is used as the unique identifier */}
      <input
        placeholder="Enter Serial Number"
        value={serialNumber}
        onChange={(e) => setSerialNumber(e.target.value)}
      />

      <button onClick={handleDelete}>Delete</button>

      {/* Display result message */}
      <p>{message}</p>

      <Link href="/">Back to Home</Link>
    </main>
  );
}
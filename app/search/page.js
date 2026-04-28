"use client";

import { useState } from "react";
import Link from "next/link";

export default function SearchPage() {
  // State for input and results
  const [serial, setSerial] = useState("");
  const [results, setResults] = useState([]);

  // Handle search request
  const handleSearch = async () => {
    const res = await fetch(`/api/search?serialNumber=${serial}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <main>
      <h1>Search Appliance</h1>

      {/* Input field for serial number */}
      <input
        placeholder="Enter Serial Number"
        value={serial}
        onChange={(e) => setSerial(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {/* Display results */}
      {results.length > 0 && (
        <div>
          <h2>Results:</h2>
          {results.map((item) => (
            <div className="result-card" key={item.ApplianceID}>
              <p><b>Type:</b> {item.ApplianceType}</p>
              <p><b>Brand:</b> {item.Brand}</p>
              <p><b>Serial:</b> {item.SerialNumber}</p>
              <p><b>User:</b> {item.FirstName} {item.LastName}</p>
              <hr />
            </div>
          ))}
        </div>
      )}

      <Link href="/">Back to Home</Link>
    </main>
  );
}
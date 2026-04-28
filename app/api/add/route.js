import pool from "@/lib/db";

// Handle POST request (Add appliance)
export async function POST(req) {
  try {
    const data = await req.json();

    const {
      firstName,
      lastName,
      address,
      mobile,
      email,
      eircode,
      applianceType,
      brand,
      modelNumber,
      serialNumber,
      purchaseDate,
      warrantyDate,
      cost
    } = data;

    // Insert user
    const [userResult] = await pool.query(
      `INSERT INTO users (FirstName, LastName, Address, Mobile, Email, Eircode)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, address, mobile, email, eircode]
    );

    const userId = userResult.insertId;

    // Insert appliance
    await pool.query(
      `INSERT INTO appliances 
      (UserID, ApplianceType, Brand, ModelNumber, SerialNumber, PurchaseDate, WarrantyExpirationDate, Cost)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, applianceType, brand, modelNumber, serialNumber, purchaseDate, warrantyDate, cost]
    );

    return Response.json({ message: "Appliance added successfully" });

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error adding appliance" }, { status: 500 });
  }
}
import pool from "@/lib/db";

// Handle PUT request (Update appliance)
export async function PUT(req) {
  try {
    const data = await req.json();

    const {
      serialNumber,
      brand,
      modelNumber,
      cost
    } = data;

    // Update appliance using serial number (unique identifier)
    const [result] = await pool.query(
      `UPDATE appliances 
       SET Brand = ?, ModelNumber = ?, Cost = ?
       WHERE SerialNumber = ?`,
      [brand, modelNumber, cost, serialNumber]
    );

    // If no rows affected, appliance not found
    if (result.affectedRows === 0) {
      return Response.json({ message: "Appliance not found" });
    }

    return Response.json({ message: "Appliance updated successfully" });

  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Error updating appliance" },
      { status: 500 }
    );
  }
}
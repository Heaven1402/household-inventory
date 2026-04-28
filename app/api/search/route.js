import pool from "@/lib/db";

// Handle GET request to search appliances by serial number
export async function GET(req) {
  try {
    // Get search query from URL
    const { searchParams } = new URL(req.url);
    const serialNumber = searchParams.get("serialNumber");

    // Validate that a serial number was provided
    if (!serialNumber) {
      return Response.json(
        { error: "Serial number is required" },
        { status: 400 }
      );
    }

    // Search appliance and related user using a JOIN
    const [rows] = await pool.query(
      `SELECT 
        appliances.ApplianceID,
        appliances.ApplianceType,
        appliances.Brand,
        appliances.ModelNumber,
        appliances.SerialNumber,
        appliances.PurchaseDate,
        appliances.WarrantyExpirationDate,
        appliances.Cost,
        users.FirstName,
        users.LastName,
        users.Address,
        users.Mobile,
        users.Email,
        users.Eircode
      FROM appliances
      JOIN users ON appliances.UserID = users.UserID
      WHERE appliances.SerialNumber LIKE ?`,
      [`%${serialNumber}%`]
    );

    // Return search results as JSON
    return Response.json(rows);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Error searching appliance" },
      { status: 500 }
    );
  }
}
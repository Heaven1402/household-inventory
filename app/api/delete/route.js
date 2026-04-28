import pool from "@/lib/db";

// Handle DELETE request
export async function DELETE(req) {
  try {
    const data = await req.json();
    const { serialNumber } = data;

    // Delete appliance using serial number
    const [result] = await pool.query(
      "DELETE FROM appliances WHERE SerialNumber = ?",
      [serialNumber]
    );

    // Check if any record was deleted
    if (result.affectedRows === 0) {
      return Response.json({ message: "Appliance not found" });
    }

    return Response.json({ message: "Appliance deleted successfully" });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Error deleting appliance" },
      { status: 500 }
    );
  }
}
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Household Appliance Inventory</h1>

      {/* Navigation links */}
      <ul>
        <li><Link href="/add">Add Appliance</Link></li>
        <li><Link href="/search">Search Appliance</Link></li>
        <li><Link href="/update">Update Appliance</Link></li>
        <li><Link href="/delete">Delete Appliance</Link></li>
      </ul>
    </main>
  );
}
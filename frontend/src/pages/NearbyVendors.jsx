import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function NearbyVendors() {
  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState("");

  const vendorId = localStorage.getItem("vendorId");

  useEffect(() => {
    const fetchNearbyVendors = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/dashboard/nearby?vendorId=${vendorId}&radius=21`,
          { headers }
        );
        const fetchedVendors = res.data.vendors || [];
        console.log("Fetched nearby vendors:", fetchedVendors);

        setVendors(fetchedVendors);
        if (fetchedVendors.length === 0) {
          setError("No nearby vendors found.");
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to load vendors.");
        setVendors([]);
      }
    };

    fetchNearbyVendors();
  }, [vendorId]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-10 overflow-auto">
        <h2 className="text-3xl font-semibold mb-8">Nearby Vendors</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {vendors.length === 0 ? (
          <p className="text-gray-600 mt-4">No nearby vendors available.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Business Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Market
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Distance (km)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {vendors.map((vendor) => (
                  <tr key={vendor._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {vendor.legalBusinessName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {vendor.firstName} {vendor.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {vendor.businessEmail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {vendor.businessPhone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {vendor.market}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {vendor.distanceInKm?.toFixed(2) || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

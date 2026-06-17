"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPinIcon, TruckIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");

  const handleTrack = () => {
    setError("");
    setOrder(null);
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const found = orders.find((o: any) => o.orderNumber === orderNumber.trim());
    if (found) {
      setOrder(found);
    } else {
      setError("Order not found. Please check your order number.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-6">Track Your Order</h1>
        <div className="mb-6 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Enter your order number"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="flex-1 border rounded px-4 py-2"
          />
          <button
            onClick={handleTrack}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark"
          >
            Track
          </button>
        </div>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {order && (
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
              <TruckIcon className="h-5 w-5 mr-2 text-primary" />
              Order #{order.orderNumber}
            </h2>
            <p className="mb-2">Placed on: {new Date(order.orderDate).toLocaleString()}</p>
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                <CheckCircleIcon className="h-4 w-4 mr-1" />
                Status: Confirmed & Processing
              </span>
            </div>
            <div className="mb-2">
              <span className="font-medium">Shipping to:</span> {order.customer.address}
            </div>
            <div className="mb-2">
              <span className="font-medium">Total:</span> ₹{order.totals?.total}
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <MapPinIcon className="h-4 w-4 mr-1" />
              Your order is being prepared for shipment. Tracking will be updated soon!
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
} 
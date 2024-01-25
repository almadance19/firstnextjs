
import React from 'react';
import QRCode from 'qrcode.react';
import { useEffect } from "react";
import PdfButton from "./PdfButton";
import PrintButton from './PrintPage';


export default function FormDataDisplay({data}) {
  // Format the date string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Generate the PDF when component mounts
  useEffect(() => {
    // Check if running in the browser environment
    if (typeof window !== 'undefined') {
    }}, []);
 

  return (
    <>
  <div id="printableContent" className="container mx-auto p-4">
  <h1 className="text-2xl font-bold mb-4">{data.EventExists.eventName}</h1>
  <form className="bg-white border border-gray-300 p-4 rounded-md">
    <div className="mb-4">
      <label className="block text-gray-600 mb-2">Payment Date</label>
      <input
        type="text"
        value={formatDate(data.CheckoutData.created_at)}
        className="form-input w-full border-b-2 border-gray-400 cursor-not-allowed"
        readOnly
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-600 mb-2">Email ID</label>
      <input
        type="text"
        value={data.CheckoutData.email}
        className="form-input w-full border-b-2 border-gray-400 cursor-not-allowed"
        readOnly
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-600 mb-2">Ticket Name</label>
      <input
        type="text"
        value={data.CheckoutData.name_ticket}
        className="form-input w-full border-b-2 border-gray-400 cursor-not-allowed"
        readOnly
      />
    </div>
    <div className="mb-4">
          <label className="block text-gray-600 mb-2">Payer Name</label>
          <input
            type="text"
            value={data.CheckoutData.name_payment}
            className="form-input w-full border-b-2 border-gray-400 cursor-not-allowed"
            readOnly
          />
          </div>
          <div className="mb-4">
          <label className="block text-gray-600 mb-2">Ticket Type</label>
          <input
            type="text"
            value={data.CheckoutData.ticket_type}
            className="form-input w-full border-b-2 border-gray-400 cursor-not-allowed"
            readOnly
          />
          </div> 
          <div className="mb-4">
          <label className="block text-gray-600 mb-2">Ticket Nr</label>
          <input
            type="text"
            value={data.CheckoutData.ticket_nr}
            className="form-input w-full border-b-2 border-gray-400 cursor-not-allowed"
            readOnly
          />
          </div> 
          <div className="mb-4">
          <label className="block text-gray-600 mb-2">Payment Amount</label>
          <input
            type="text"
            value={data.CheckoutData.pre_total+" EUR"}
            className="form-input w-full border-b-2 border-gray-400 cursor-not-allowed"
            readOnly
          />
        </div>
        <div className="mb-4">
        <label className="block text-gray-600 mb-2">Ticket ID</label>
          <input
            type="text"
            value={data.CheckoutData.ticket_id}
            className="form-input w-full border-b-2 border-gray-400 cursor-not-allowed"
            readOnly
          />
          </div>
  </form>
  <div className="mt-4">
    <QRCode value="https://example.com" size={200} />
  </div>
  </div>
    <PrintButton />
    </>
  );
};

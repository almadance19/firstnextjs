
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
  <form className="bg-white border border-gray-300 p-4 rounded-md">
  <h1 className="text-3xl font-bold mb-4">{data.EventExists.eventName}</h1>
  <h2 className="text-2xl font-bold mb-4">{data.EventExists.eventDate}</h2>
  <p className=" font-bold mb-4">{data.EventExists.eventAdress}</p>
  <p className=" font-bold mb-4">{data.EventExists.eventDescription}</p>
  <br />
    <div className="mb-4">
      <label className="block text-gray-600 mb-2 font-bold">Payment Date</label>
      <input
        type="text"
        value={formatDate(data.CheckoutData.created_at)}
        className="form-input w-full   cursor-not-allowed"
        readOnly
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-600 mb-2 font-bold">Email ID</label>
      <input
        type="text"
        value={data.CheckoutData.email}
        className="form-input w-full   cursor-not-allowed"
        readOnly
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-600 mb-2 font-bold">Ticket Name</label>
      <input
        type="text"
        value={data.CheckoutData.name_ticket}
        className="form-input w-full   cursor-not-allowed"
        readOnly
      />
    </div>
    <div className="mb-4">
          <label className="block text-gray-600 mb-2 font-bold">Payer Name</label>
          <input
            type="text"
            value={data.CheckoutData.name_payment}
            className="form-input w-full   cursor-not-allowed"
            readOnly
          />
          </div>
          <div className="mb-4">
          <label className="block text-gray-600 mb-2 font-bold">Ticket Type</label>
          <input
            type="text"
            value={data.CheckoutData.ticket_type}
            className="form-input w-full   cursor-not-allowed"
            readOnly
          />
          </div> 
          <div className="mb-4">
          <label className="block text-gray-600 mb-2 font-bold">Ticket Nr</label>
          <input
            type="text"
            value={data.CheckoutData.ticket_nr}
            className="form-input w-full   cursor-not-allowed"
            readOnly
          />
          </div> 
          <div className="mb-4">
          <label className="block text-gray-600 mb-2 font-bold">Payment Amount</label>
          <input
            type="text"
            value={data.CheckoutData.pre_total+" EUR"}
            className="form-input w-full   cursor-not-allowed"
            readOnly
          />
        </div>
        <div className="mb-4">
        <label className="block text-gray-600 mb-2 font-bold">Ticket ID</label>
          <input
            type="text"
            value={data.CheckoutData.ticket_id}
            className="form-input w-full   cursor-not-allowed"
            readOnly
          />
          </div>
          <br />
          <div className="mb-4 justify-center items-center">
    <QRCode value={`/ticket?event=${data.CheckoutData.eventURL}&id=${data.CheckoutData.ticket_id}&type=org`} size={200} />
  </div>
  </form>
  </div>
    <PrintButton />
    </>
  );
};

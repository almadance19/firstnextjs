
import React from 'react';
import QRCode from 'qrcode.react';
import { useEffect } from "react";


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
      const html2pdf = require('html2pdf.js'); // Dynamic import to avoid SSR issues
      generatePdf(html2pdf);
    }

  }, []);
 

  // Generate the PDF
  const generatePdf = (html2pdf) => {
    const element = document.getElementById('pdfContent');

    // Set the visibility and position properties
    element.style.visibility = 'hidden';
    element.style.position = 'absolute';
    element.style.left = '-9999px';

    // Generate the PDF
    html2pdf(element);

    // Reset the visibility and position properties after generating the PDF
    element.style.visibility = 'visible';
    element.style.position = 'static';
    element.style.left = 'auto';
  };




  return (
    <>
    <div id="pdfContent" className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{data.EventExists.eventName}</h1>
      <form className="bg-white border border-gray-300 p-4 rounded-md">
        <div className="mb-4">
          <label className="block text-gray-600">Payment Date</label>
          <br/>
          <input
            type="text"
            value={formatDate(data.CheckoutData.created_at)}
            className="form-input border-b-2 border-gray-400 cursor-not-allowed"
            readOnly
          />
        </div>
          <div className="mb-4">
          <label className="block text-gray-600">Email ID</label>
          <br/>
          <input
            type="text"
            value={data.CheckoutData.email}
            className="form-input border-b-2 border-gray-400 cursor-not-allowed"
            readOnly
          />
          </div>
          <div className="mb-4">
          <label className="block text-gray-600">Ticket Name</label>
          <input
            type="text"
            value={data.CheckoutData.name_ticket}
            className="form-input border-b-2 border-gray-400 cursor-not-allowed"
            readOnly
          />
          </div>
          <div className="mb-4">
          <label className="block text-gray-600">Payer Name</label>
          <input
            type="text"
            value={data.CheckoutData.name_payment}
            className="form-input border-b-2 border-gray-400 cursor-not-allowed"
            readOnly
          />
          </div>
          <div className="mb-4">
          <label className="block text-gray-600">Ticket Type</label>
          <input
            type="text"
            value={data.CheckoutData.ticket_type}
            className="form-input border-b-2 border-gray-400 cursor-not-allowed"
            readOnly
          />
          </div> 
          <div className="mb-4">
          <label className="block text-gray-600">Ticket Nr</label>
          <input
            type="text"
            value={data.CheckoutData.ticket_nr}
            className="form-input border-b-2 border-gray-400 cursor-not-allowed"
            readOnly
          />
          </div> 
          <div className="mb-4">
          <label className="block text-gray-600">Payment Amount</label>
          <input
            type="text"
            value={data.CheckoutData.pre_total+" EUR"}
            className="form-input border-b-2 border-gray-400 cursor-not-allowed"
            readOnly
          />
        </div>
        <div className="mb-4">
        <label className="block text-gray-600">Ticket ID</label>
          <input
            type="text"
            value={data.CheckoutData.ticket_id}
            className="form-input border-b-2 border-gray-400 cursor-not-allowed"
            readOnly
          />
          </div>
        {/* Repeat similar blocks for other data fields */}
      </form>
      <div className="mt-4">
          <QRCode value="https://example.com" size={200} />
      </div>
    </div>
    <button onClick={generatePdf} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Generate PDF
    </button>
    </>
  );
};

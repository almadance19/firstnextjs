
import React from 'react';
import { CldImage } from 'next-cloudinary';
import QRCode from 'qrcode.react';
import { useEffect } from "react";
import PdfButton from "./PdfButton";
import PrintButton from './PrintPage';
import Image from 'next/image';


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
  <div className='content-justify-center items-center '>
  {data.EventExists.eventFotoURL !== undefined ? (
    <CldImage
        src={data.EventExists.eventFotoURL}
        width="300"
        height="300"
        crop="fill"
        gravity="auto"
        radius="10"
        effect="sepia"
        className="img-fluid"
        alt="My Event Ticket"
      /> 
  ): (
    <Image
          src='/assets/images/ticket2.svg'
          alt='logo'
          width={300}
          height={300}
          className='object-contain'
        />
  ) }
  </div>
  <h1 className="text-3xl font-bold mb-4">{data.EventExists.eventName}</h1>
  <h2 className="text-2xl font-bold mb-4">{data.EventExists.eventDate}</h2>
  <p className=" font-bold mb-4">{data.EventExists.eventAdress}</p>
  <p className=" font-bold mb-4">Details: {data.EventExists.eventDescription}</p>
  <p className=" font-bold mb-4">Website:</p>
  <p className=" font-bold mb-4">Telefon:</p>
  <br />
  <div className="mb-4">
  <label className="block text-gray-600 mb-2 font-bold">Payment Date</label>
  <p className="text-gray-800">{formatDate(data.CheckoutData.created_at)}</p>
</div>
<div className="mb-4">
  <label className="block text-gray-600 mb-2 font-bold">Email ID</label>
  <p className="text-gray-800">{data.CheckoutData.email}</p>
</div>
<div className="mb-4">
  <label className="block text-gray-600 mb-2 font-bold">Ticket Name</label>
  <p className="text-gray-800">{data.CheckoutData.name_ticket}</p>
</div>
<div className="mb-4">
  <label className="block text-gray-600 mb-2 font-bold">Payer Name</label>
  <p className="text-gray-800">{data.CheckoutData.name_payment}</p>
</div>
<div className="mb-4">
  <label className="block text-gray-600 mb-2 font-bold">Ticket Type</label>
  <p className="text-gray-800">{data.CheckoutData.ticket_type}</p>
</div>
<div className="mb-4">
  <label className="block text-gray-600 mb-2 font-bold">Payment Amount</label>
  <p className="text-gray-800">{data.CheckoutData.pre_total} EUR</p>
</div>
<div className="mb-4">
  <label className="block text-gray-600 mb-2 font-bold">Ticket Nr</label>
  <p className="text-gray-800">{data.CheckoutData.ticket_nr}</p>
</div>

          <br />
          <div className="mb-4 justify-center items-center">
    <QRCode value={`https://firstnextjs-wine.vercel.app/ticket?event=${data.CheckoutData.eventURL}&id=${data.CheckoutData.ticket_id}&type=org`} size={200} />
  </div>
  </form>
  </div>
    <PrintButton />
    </>
  );
};

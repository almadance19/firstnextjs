"use client"

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

    const  handleSendEmail = async () => {

      try{
        if (!data || !data.CheckoutData) {
          console.error('Invalid data:', data);
          return;
        }
      //CREATE GET REQUEST TO GOOGLE SHEET API
      // Add EMAIL, LINK, NAME, EVENTNAME and send it as Parameters
      //let google_string= `${URL}?eventURL=${eventURL}&ticket_id=${ticket_id}&email=${email}`;
          const URL = "https://script.google.com/macros/s/AKfycbyFmNvafsmVqbRyvpESJRe4XLMd24TFOEdn7tDAagixS0WOM6ZLoQ8MKB_fh7Wku-Q/exec";        
          const eventURL = data.CheckoutData.eventURL;
          const eventName = data.CheckoutData.eventName;
          const ticket_id = data.CheckoutData.ticket_id;
          const ticket_nr = data.CheckoutData.ticket_nr;
          const email = data.CheckoutData.email;
          const name_payment = data.CheckoutData.name_payment;
          const name_ticket = data.CheckoutData.name_ticket;
          const ticket_type = data.CheckoutData.ticket_type;
          const pre_total = data.CheckoutData.pre_total;
          let google_string= `${URL}?eventURL=${eventURL}&eventName=${eventName}&ticket_id=${ticket_id}&ticket_nr=${ticket_nr}&email=${email}&name_payment=${name_payment}&name_ticket=${name_ticket}&ticket_type=${ticket_type}&pre_total=${pre_total}`;
          
            console.log('Sending email...',google_string);
            const response = await fetch(google_string);
            const responseData = await response.json();
      console.log('Email sent.', responseData);
      if (responseData.status="success"){
        alert('Email sent sucessfully to: '+email)
      }
      if (!responseData.ok) {
        throw new Error(`Failed to send Email. Status: ${responseData}`);
      } else {
        alert('Ticket sent to your Email: ' + email);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleEmailClick = async () => {
    await handleSendEmail();
  };
    
 

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
  <div className='p-4'>
      <button className='btn btn-active btn-secondary' onClick={handleEmailClick}>Send Ticket to Email</button>
      {/* Your other page content */}
  </div>
  <div className='p-4'>
  <PrintButton data={data} />
  </div>
    </>
  );
};

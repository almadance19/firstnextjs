import React from 'react';
import { useState } from 'react';
import { useSession } from "next-auth/react";


export default function EditFormDataDisplay({data}) {
  // Format the date string

  const [form, setForm] = useState({
    email: data.CheckoutData.email,
    name_ticket: data.CheckoutData.name_ticket,
    ticket_type: data.CheckoutData.ticket_type,
    pre_total: data.CheckoutData.pre_total,
    ticket_nr: data.CheckoutData.ticket_nr,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    try {
      const body = {
        email: form.email,
        name_ticket: form.name_ticket,
        ticket_type: form.ticket_type,
        pre_total: data.CheckoutData.pre_total,	  
        ticket_nr: data.CheckoutData.ticket_nr,
        ticket_id: data.CheckoutData.ticket_id,
      };

    
      console.log("Sending data to API...", body);

      const response = await fetch("/api/ticket/edit", {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({ "Content-Type": "application/json"}),
      });

      if (response.ok) {
        console.log(response)
        // router.push("/");
      }
    } catch (error) {
      console.log("Error sending data to API:");
      console.log(error);
    } finally {
      console.log("Finally");
    }


  }
  
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: type === 'checkbox' ? checked : value,
    }));
   
  };

 

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
      <label className="block text-gray-600 mb-2 font-bold">Email ID</label>
      <input
        type="text"
        name="email"
        id="email"
        placeholder={data.CheckoutData.email}
        className="form-input w-full"
        value={form.email}
        onChange={handleChange}
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-600 mb-2 font-bold">Ticket Name</label>
      <input
        type="text"
        name="name_ticket"
        id="name_ticket"
        placeholder={data.CheckoutData.name_ticket}
        className="form-input w-full"
        value={form.name_ticket}
        onChange={handleChange}
      />
    </div>
          <div className="mb-4">
          <label className="block text-gray-600 mb-2 font-bold">Ticket Type</label>
          <input
            type="text"
            name="ticket_type"
            id="ticket_type"
            value={data.CheckoutData.ticket_type}
            className="form-input w-full   cursor-not-allowed"
            readOnly
          />
          </div> 
          <div className="mb-4">
          <label className="block text-gray-600 mb-2 font-bold">Payment Amount</label>
          <input
            type="text"
            name="pre_total"
            id="pre_total"
            value={data.CheckoutData.pre_total+" EUR"}
            className="form-input w-full   cursor-not-allowed"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2 font-bold">Ticket Nr</label>
          <input
            type="text"
            name="ticket_nr"
            id="ticket_nr"
            value={data.CheckoutData.ticket_nr}
            className="form-input w-full   cursor-not-allowed"
            readOnly
          />
          </div> 
          <br />
          <div className="mb-4 justify-center items-center">
          <button
          onClick={handleFormSubmit}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Edit Ticket
        </button>
  </div>
  </form>
  </div>
    </>
  );
};







// components/TicketList.js

import React from 'react';
import Link from 'next/link';
import Image from "next/image";

const TicketList = ({ tickets }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tickets.map((ticket) => (
        <Link href={`/ticket?event=${ticket.eventURL}&id=${ticket.ticket_id}&type=org`} key={ticket._id}>
        <div className=''>
        <div className='flex justify-between items-start gap-5'>
        <div key={ticket._id} className="bg-white p-4 rounded-md shadow-md">
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image
            src="https://unpkg.com/@icon/icofont/icons/ticket.svg"
            alt='user_image'
            width={25}
            height={25}
            className='rounded-full object-contain'
          />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
            TICKET
            </h3>
            <p className='font-inter text-sm text-gray-500'>
            {ticket.eventName}
            </p>
          </div>
        </div>
          <h2 className="text-xl font-semibold mb-2">{ticket.ticket_type}</h2>
          <h3 className="text-xl font-semibold mb-2">{ticket.name_ticket}</h3>
          <p className="text-gray-600">{ticket.email}</p>
          <p className="text-gray-600">{ticket.ticket_nr}</p>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">{new Date(ticket.created_at).toLocaleDateString()}</p>
            <span className="text-sm text-indigo-600">{ticket.total} EUR</span>
          </div>
        </div>
        </div>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default TicketList;

// components/TicketList.js

import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const TicketList = ({ tickets, role }) => {
  const { data: session } = useSession();
    // Search states
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const filterPrompts = (searchtext) => {
      const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
      return tickets.filter(
        (item) =>
          regex.test(item.email) ||
          regex.test(item.name_ticket) ||
          regex.test(item.name_payment) ||
          regex.test(item.ticket_nr)
      );
    };
  
    const handleSearchChange = (e) => {
      clearTimeout(searchTimeout);
      setSearchText(e.target.value);
  
      // debounce method
      setSearchTimeout(
        setTimeout(() => {
          const searchResult = filterPrompts(e.target.value);
          console.log(searchResult);
          setSearchedResults(searchResult);
        }, 500)
      );
    };

    
  return (
    <>
    <section className='feed p-4'>
    <form className='relative w-full flex-center'>
      <input
        type='text'
        placeholder='Search for a Ticket by email, ticket name, payment name'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer'
      />
    </form>
    </section>
    {/* All Prompts */}
    {searchText ? (
        <PromptCardList
          tickets={searchedResults} role={role} session={session} 
        />
      ) : (
        <PromptCardList tickets={tickets} role={role} session={session}  />
      )}
    
  </>
  );
};

export default TicketList;

const PromptCardList = ({ tickets, role, session }) => {
return (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tickets.map((ticket) => (
        <Link href={`/ticket?event=${ticket.eventURL}&id=${ticket.ticket_id}&type=${role}`} key={ticket._id}>
        <div className=''>
        <div className='flex justify-between items-start gap-5'>
        <div key={ticket._id} className="bg-white p-4 rounded-md shadow-md">
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image
            src={session?.user.image}
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
)
}
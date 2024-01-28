"use client"

import { useSearchParams } from "next/navigation";
import Head from 'next/head';
import { useSession } from "next-auth/react";
import { useState } from 'react';
import CsvTable from "@components/TicketTable";
import Link from "next/link";
import TicketList from "@components/TicketList";

/// SAVE THE TICKET ALREADY AT CREATION WITHOUT HAVING TO GO TO WEB PAGE AND RISK MESSING WITH API
// HIDE ORGANISER ID FROM ALL CLIENT TICKETS


const EventPage = () => {

  const [allCSVData, setallCSVData] = useState(null);
  const [allCardData, setallCardData] = useState(null);
  const [csvbuttonCliked, setButtonClicked] = useState(false);
  const [cardbuttonCliked, setCardButtonClicked] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("eventurl");   
  const { data: session } = useSession();
  console.log(id,"Id was here",session?.user.id); 

    const  handleGetAllData = async () => {
    //Wait 3 seconds before sending data to API
    try {
      if (id && session?.user.id ) {
        const body = {
          session: session?.user.id,
          eventid: id,
        };
        const event_ticket_data = await fetchURL(body);


          setallCSVData(event_ticket_data);
          setButtonClicked(true);
          setCardButtonClicked(true);


          
      } else {
        console.error('ID or Event is undefined or null.');
      }
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  };
  
  const fetchURL = async (body) => {
    try {
    const response2 = await fetch("/api/organisers/tickets", 
    {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({ "Content-Type": "application/json" }),
    });

    if (!response2.ok) {
        throw new Error(`Failed to fetch URL. Status: ${response2.status}`);
    }
    
    const data2 = await response2.json();
    console.log('STRIPE API REP:', data2);

    return data2;
    } catch (error) {
    console.error('Error fetching URL:', error);
    throw error;
    }
};

const handleGetCardData = async () => {
    //Wait 3 seconds before sending data to API
    try {
      if (id && session?.user.id ) {
        const body = {
          session: session?.user.id,
          eventid: id,
        };
        const event_ticket_data = await fetchURL(body);

        setButtonClicked(true);
        setCardButtonClicked(true);
        setallCardData(event_ticket_data);

          
      } else {
        console.error('ID or Event is undefined or null.');
      }
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  };
  
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{id}</span>
      </h1>
      <span className='desc text-left'>****Download your participant list or edit individual ticket</span>
      <p className='desc text-left'>{session?.user.email}</p>

      <div className="">
      {/* min-h-screen flex items-center justify-center */}
      {/* <div className="bg-white p-8 rounded-md shadow-md"> */}
      <div>
      <h1 className="text-2xl font-semibold mb-4">Event Sales Manager</h1>
      {(!csvbuttonCliked || !cardbuttonCliked) &&  (
        <div>
        <div className="mb-4">
        <button
          id="send-to-api"
          name="send-to-api"
          onClick={handleGetAllData}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          See all Sales
        </button>
        </div>
        <div className="mb-4">
                  <button
        id="send-to-api"
        name="send-to-api"
        onClick={handleGetCardData}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search and Edit Individual Tickets
      </button>
      </div>
      </div>
      )}
      
        {allCSVData ? (
            <CsvTable data={allCSVData} />
        ) : (
            <p className="text-gray-500"></p>
        )}
        {allCardData ? (
            <TicketList tickets={allCardData} role={"org"}  />
        ) : (
            <p className="text-gray-500"></p>
        )}
      </div>
    </div>
    </section>



  );
};

export default EventPage;
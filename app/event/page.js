"use client"
import { CldImage } from 'next-cloudinary';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EventPage() {
    const [apiResponse, setApiResponse] = useState(null);

    console.log("EVENT")

    const searchParams = useSearchParams();

    const promptId = searchParams.get("id");
    console.log("id",promptId)

    //trigger 

    useEffect(() => {
        handleSendToApi();
    }, []); 

    const handleSendToApi = async () => {
    const body = {
        _id: promptId,
      };
    const fetchURL = async () => {
        try {
          console.log('Fetching URL...', promptId);
          const response2 = await fetch("/api/event/findone", 
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: new Headers({ "Content-Type": "application/json" }),
          });


          if (!response2.ok) {
            throw new Error(`Failed to fetch URL. Status: ${response2.status}`);
          }
           
          const data2 = await response2.json();
   
          return data2;
        } catch (error) {
          console.error('Error fetching URL:', error);
          throw error;
        }
      };

      const event_ticket_data = await fetchURL();

      setApiResponse(event_ticket_data);
    };

    return (
        <>
        {apiResponse ? ( <section className='w-full'>
    <div className='primary-content '>
        <CldImage
            src={apiResponse.eventFotoURL}
            width="600"
            height="200"
            crop="fill"
            gravity="auto"
            radius="10"
            effect="sepia"
            className="img-fluid"
            alt="My Event Ticket"
        />
        <h1 className='head_text text-left'>
            <span className='blue_gradient'>{apiResponse.eventName}</span>
        </h1>
        <p className='desc text-left'>
         <strong>Event Date: </strong>{apiResponse.eventDate}
        </p>

        <h2 className='font-bold  desc text-left'>Website</h2>
        <a href={apiResponse.eventWebsite} target="_blank" rel="noopener noreferrer">
            <p className='desc text-left'>
            {apiResponse.eventWebsite}
            </p>
        </a> 
        <h2 className='font-bold  desc text-left'>Organiser Email</h2>
        <p className='desc text-left'>
        {apiResponse.eventEmail}
        </p>

        <h2 className='font-bold  desc text-left'>Description</h2>
        <p className='desc text-left'>
        {apiResponse.eventDescription}
        </p>

        <h2 className='font-bold  desc text-left'>Location Address</h2>
        <p className='desc text-left'>
        {apiResponse.eventAdress}
        </p>


        <h2 className='font-bold  desc text-left'>Ready to Get Started?</h2>
        <p className='desc text-left'>
        Buy Tickets on the Website!
        </p>
        <div className='primary-content py-4 my-2'>
        <a href={apiResponse.eventWebsite} className='desc text-left'>
        <button className="btn btn-success">Go to Website</button>
        </a>  
            </div>
        </div>
    </section>) : (
        <p>Loading...</p>
    )}
        </>
    );
}

"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EventList from "@components/EventList";


/*
See sold tickets DONE 
See bought tickets DONE
See registered events DONE
Edit Events   
Edit Tickets (Namechange -Emailchange)
Download sold tickets as csv
*/
// HIDE ORGANISER ID FROM ALL CLIENT TICKETS


const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {


    const fetchEvents = async () => {
      const response = await fetch(`/api/organisers/${session?.user.id}/myevent`);
      const  EventData = await response.json();
      console.log(EventData);
       setMyEvents(EventData);
    };


    if (session?.user.id) 
    fetchEvents();
  }, [session?.user.id]);


  return (
    <>

<section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>MY EVENTS</span>
      </h1>
      <p className='desc text-left'>{session?.user.email}</p>

      <div className='mt-10 '>

          <EventList events={myEvents} />

      </div>
    </section>

    </>

    
  );
};

export default MyProfile;
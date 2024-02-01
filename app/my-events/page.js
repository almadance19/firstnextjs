"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EventList from "@components/EventList";
import Link from "next/link";


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
      //  console.log(EventData);
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
      <span className='desc text-left'>**** Only for Organisers</span>
      <p className='desc text-left'>{session?.user.email}</p>

      <div className='mt-10 '>

          <EventList events={myEvents} />

      </div>
    </section>
    <section className='w-full py-2'>
      <h2 className='text-left text-bold'>Become a Partner</h2>
      <p className='text-left text-bold'>
        Create your events, sell your tickets online and manage them with us.
      </p>
      <Link href='/become-a-partner'>
        <button className='btn btn-info py-3 my-2'>Create Event</button>
      </Link>
    </section>

    </>

    
  );
};

export default MyProfile;
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TicketList from "@components/TicketList";
import Profile from "@components/Profile";
import FormDataDisplay from "@components/dataTicket"; 

/*
See tickets by email
DONE
ADD FILTER TO SEARCH BY EVENT AND USER
*/

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [myEvents, setMyEvebts] = useState([]);

  useEffect(() => {

    console.log(session?.user.email);


    const fetchEvents = async () => {
      const response = await fetch(`/api/users/${session?.user.email}/tickets`);
      const CheckoutData = await response.json();
      console.log(CheckoutData);
       setMyEvebts(CheckoutData);
    };


    if (session?.user.id) 
    fetchEvents();
  }, [session?.user.id]);



  return (
    <>

<section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>MY TICKETS</span>
      </h1>
      <span className='desc text-left'>****Only for Users. Here you will see your saved tickets linked to your email and profile.</span>
      <p className='desc text-left'>{session?.user.email}</p>

      <div className='mt-10 '>

          <TicketList tickets={myEvents} role="buyer" />

      </div>
    </section>

    </>

    
  );
};

export default MyProfile;
"use client";

import { useSearchParams } from "next/navigation";
import Head from 'next/head';
import { useRouter } from "next/navigation";
import FormDataDisplay from "@components/dataTicket";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

/*
Save TICKET FIRST 
ASK IF USER WANTS TO SIGN IN TO SAVE TICKET ON THE SYSTEM AND GET NOTIFICATIONS
IF USER SAYS YES THEN SIGN IN AND LINK IT TO THE TICKET
SO PROBABLY THE ID WILL BE THE EMAIL AND NOT THE USER ID FROM NEXT AUTH

user with Email and then create ticket
See tickets by email not user id
*/

/// SAVE THE TICKET ALREADY AT CREATION WITHOUT HAVING TO GO TO WEB PAGE AND RISK MESSING WITH API
/// SAVE THE TICKET ALREADY AT CREATION WITHOUT HAVING TO GO TO WEB PAGE AND RISK MESSING WITH API


const ExternalApiPage = () => {
  const [providers, setProviders] = useState(null);

  const [apiResponse, setApiResponse] = useState(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const event = searchParams.get("event");
  const type = searchParams.get("type") || "buyer";
  const { data: session } = useSession();
  console.log(id," ",event," ",type," ",session?.user.id);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const handleSendToApi = async () => {
    try {
      if (id && event) {
        const body = {
          eventURL: event,
          id: id,
          type: type,
        };

        
        const fetchURL = async () => {
          try {
            console.log('Fetching URL...', event);
            const response2 = await fetch("/api/event_url", 
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
  
        const event_ticket_data = await fetchURL();

        /*
        const URL = "https://script.google.com/macros/s/AKfycbxkEXaZ8Nx_aIicZB7xZEq_p7T-P3o4QkfOkBoov9i14GDVXlsUC1VieZKiydojNAP2/exec?";
        console.log('Sending data to API...', event);
        let google_string= `${URL}code=${id}`;
        console.log('Sending data to API...',google_string);
        const response = await fetch(google_string);
        const data = await response.json();
        */

        setApiResponse(event_ticket_data);
        
        if (event_ticket_data) {
          try {
                if (type === "org") {
                  event_ticket_data.CheckoutData.creator = {};
                } else if (type === "buyer") {
                  event_ticket_data.CheckoutData.creator = session?.user.id || {};
                }
            console.log('Sessiom...', session?.user.id);
            event_ticket_data.CheckoutData.eventURL = event || {};
            event_ticket_data.CheckoutData.eventName = event_ticket_data.EventExists.eventName || {};
            event_ticket_data.CheckoutData.eventOrganiserId = event_ticket_data.EventExists.creator || {};

            console.log(event_ticket_data.CheckoutData.creator );  
       

          console.log("Saving Ticket in DB...", event_ticket_data.CheckoutData);
  
          const response = await fetch("/api/saveticket", {
            method: "POST",
            body: JSON.stringify(event_ticket_data.CheckoutData),
            headers: new Headers({ "Content-Type": "application/json" }),
          });
  
          if (response.ok) {
            console.log("ticket saved in DB");
            // router.push("/");
          }
        } catch (error) {
          console.log("Error sending data to API:");
          console.log(error);
        } 
      } else {
          console.error('NO DATA FOR ID OR EVENT is undefined or null.');
        }    
          
      } else {
        console.error('ID or Event is undefined or null.');
      }
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  };
  

 

  return (
    <div className="container mx-auto p-4 m-4 py-4">
      <Head>
        <title>Next.js Tailwind External API</title>
      </Head>
      {type === "org" && session?.user && (
        <div >
          <h1 className="text-2xl font-bold mb-4">Organiser View</h1>
          <p className="mb-4">
           Click the button below to see and print your Ticket
          </p>
          <button
            onClick={handleSendToApi}
            className="btn btn-primary m-4 text-white px-4 py-2 rounded hover:bg-blue-600"
          > 
            Show & Print Ticket
          </button> 
          <button
            onClick={handleSendToApi}
            className="btn btn-primary m-4 text-white px-4 py-2 rounded hover:bg-blue-600"
          > 
            Edit Ticket
          </button> 
        </div>
      )}
      {type === "buyer" && !session?.user   && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Buyer View</h1>
          <p className="mb-4">
            Click the button below to see and print your Ticket
          </p>
          <button
            onClick={handleSendToApi}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          > 
            Show & Print Ticket
          </button>  
          <p className="mb-4">
            Do you want to save your Ticket to be available in your online? Click the button below to sign in and save your Ticket.
          </p>
          <label className="block mb-2" htmlFor="email">
            ** Use the email you use in your stripe registration / SAVE OR UPDATE TICKET DATA  
          </label>
          {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in & Show Ticket
                </button>
              ))}
          
        </div>  
      )}
      {type === "buyer" && session?.user   && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Buyer View</h1>
          <p className="mb-4">
          Click the button below to see and print your Ticket
          </p>
          <button
            onClick={handleSendToApi}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          > 
            Show & Print Ticket
          </button>  
        </div>  
      )}
      {apiResponse && (
            <div>
              <FormDataDisplay data={apiResponse} />
            </div>
      )}
        <div>

        
        </div>
    </div>

  );
};

export default ExternalApiPage;
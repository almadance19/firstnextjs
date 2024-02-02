"use client";

import { useSearchParams } from "next/navigation";
import Head from 'next/head';
import FormDataDisplay from "@components/dataTicket";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import PrintButton from "@components/PrintPage";
import EditFormDataDisplay from "@components/editTicket";

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
  const [apiResponse2, setApiResponse2] = useState(null);
  const [editButton, setEditButton] = useState(null);


  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const event = searchParams.get("event");
  const type = searchParams.get("type") || "buyer";
  const { data: session } = useSession();
  console.log(id," ",event," ",type," ",session?.user.id);

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
          creator: session?.user.id,
        };

        
        const fetchURL = async () => {
          try {
            console.log('Fetching URL...', event);
            const response2 = await fetch("/api/event_url2", 
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: new Headers({ "Content-Type": "application/json" }),
            });


            if (!response2.ok) {
              throw new Error(`Failed to fetch URL. Status: ${response2.status}`);
            }
             
            const data2 = await response2.json();
     

            if (session?.user.id == data2.CheckoutData.eventOrganiserId ) {
              console.log('ORGANISER TICKET');
              setApiResponse2("Edit");
            }

            return data2;
          } catch (error) {
            console.error('Error fetching URL:', error);
            throw error;
          }
        };
  
        const event_ticket_data = await fetchURL();

        setApiResponse(event_ticket_data);
        

      } else {
        console.error('ID or Event is undefined or null.');
      }
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  };
  
  const handleEdit = async () => {
    try {
      if (id && event) {
        const body = {
          eventURL: event,
          id: id,
          type: type,
          creator: session?.user.id,
        };
        // handleSendToApi();
        setEditButton("Edit");
      }
    }
    catch (error) {
      console.error('Error sending data to API:', error);
    }
  }



  return (
    <div className="container mx-auto p-4 m-4 py-4">
      <Head>
        <title>Next.js Tailwind External API</title>
      </Head>
      {type === "org" && session?.user &&   (
        <div >
          <h1 className="text-2xl font-bold mb-4">Organiser Ticket Management</h1>
          <p className="mb-4">
           Click the button below to see and print your Ticket
          </p>
          <button
            onClick={handleSendToApi}
            className="btn btn-primary m-4 text-white px-4 py-2 rounded hover:bg-blue-600"
          > 
            Open Ticket
          </button> 
          {apiResponse2 && (
            <>
                        <button
            onClick={handleEdit}
            className="btn btn-info m-4 text-white px-4 py-2 rounded hover:bg-blue-600"
          > 
            Edit Ticket
          </button> 
          <button
            onClick={handleSendToApi}
            className="btn btn-success m-4 text-white px-4 py-2 rounded hover:bg-blue-600"
          > 
            Check In
          </button> 
            </>
          )}
        </div>
      )}
      {type === "buyer" && !session?.user   && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Welcome to My Ticket</h1>
          <p className="mb-4">
            Click the button below to see and print your Ticket
          </p>
          <button
            onClick={handleSendToApi}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          > 
            Open Ticket
          </button>  
          {providers &&
              Object.values(providers).map((provider) => (
                <>
                <p className="mb-4">
            Do you want to save your Ticket to be available here online?
          </p>
          <label className="block mb-2" htmlFor="email">
            ** Click the button to sign in and save your Ticket. Use the email you use in your stripe registration 
          </label>
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
                </>
              ))}
        </div>  
      )}
      {type === "buyer" && session?.user   && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Welcome to My Ticket</h1>
          <p className="mb-4">
          Click the button below to see and print your Ticket
          </p>
          <button
            onClick={handleSendToApi}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          > 
            Show & Open Ticket
          </button>  
        </div>  
      )}
      {editButton && (
            <div className="py-4">
              <EditFormDataDisplay data={apiResponse} />
            </div>
      )} 
      {apiResponse && (
            <div className="py-4">
              <PrintButton />
              <FormDataDisplay data={apiResponse} />
            </div>
      )}
 
      
        <div>
        </div>
    </div>

  );
};

export default ExternalApiPage;
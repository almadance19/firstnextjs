"use client"

import { CldImage } from 'next-cloudinary';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const EventList = ({ events }) => {
  const { data: session } = useSession();
  console.log(events);
  const router = useRouter();

  const handleEdit = (event) => {
    // Implement your edit logic, e.g., navigate to an edit page
    console.log(`Edit event with ID: ${event._id}`);
      router.push(`/my-events/edit-event/?id=${event._id}`);
  };

  const handleDelete = (_id) => {
    // Implement your delete logic
    console.log(`Delete event with ID: ${_id}`);
    const isConfirmed = window.confirm('Are you sure you want to delete?');

    if (isConfirmed) {
      // Perform the delete operation
      console.log('Delete operation confirmed!');
      // Add your delete logic here
      try {
        const body = {
          _id: _id,
          creator: session?.user.id,
        };
        const response = fetch("/api/event/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        console.log("response", response);
        if (!response.ok) {
          throw new Error(`Failed to fetch URL. Status`);
        } 
        // Refresh the page
        window.location.reload();
        }
        catch (error) {
          console.error('Error fetching URL:', error);
          window.location.reload();
        }
    } else {
      console.log('Delete operation canceled.');
    }
  };



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {events.map((event) => (
        <div key={event._id}>
        <section className='w-full flex justify-center items-start gap-5'>
                  {event.eventFotoURL !== null && event.eventFotoURL !== undefined ? (
                  <CldImage
                      src={event.eventFotoURL}
                      width="150"
                      height="150"
                      crop="fill"
                      gravity="auto"
                      radius="10"
                      effect="sepia"
                      className="img-fluid"
                      alt="My Event Ticket"
                    /> 
                ): (
                  <Image
                        src='/assets/images/ticket2.svg'
                        alt='logo'
                        width={150}
                        height={150}
                        className='object-contain'
                      />
                ) } 
        </section>

        <div key={event._id} className='flex justify-between items-start gap-5'>
        <div className="bg-white p-4 rounded-md shadow-md">
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
            Event Information
            </h3>
            <p className='font-inter text-sm text-gray-500'>
            {event.eventDate}
            </p>
          </div>
        </div>
          <h2 className="text-xl font-semibold mb-2">{event.eventName}</h2>
          <h3 className="text-xl font-semibold mb-2">{event.eventDate}</h3>
          <p className="text-gray-600">{event.eventEmail}</p>
          <p className="text-gray-600">{event.eventAdress}</p>
          <div className="mt-4 flex items-center justify-between">
          </div>
          <div className="mt-4 flex items-center justify-between">
              {/* Button to edit */}
              <button
                onClick={() => handleEdit(event)}
                className="text-sm text-gray-500 cursor-pointer"
              >
                Edit
              </button>

              {/* Button to delete */}
              <button
                onClick={() => handleDelete(event._id)}
                className="text-sm text-red-500 cursor-pointer"
              >
                Delete
              </button>

              {/* Button to move to another page URL */}
              <Link href={`/my-events/ticketsales?eventurl=${event.eventURL}`}> 
              <button
                className="text-sm text-indigo-600 cursor-pointer"
              >
                See Ticket Sales
              </button>
              </Link>
            </div>
        </div>
        </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;

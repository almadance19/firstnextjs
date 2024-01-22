// components/EventList.js




import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
//import { useRouter } from 'next/router';

const EventList = ({ events }) => {
//const router = useRouter();

  const handleEdit = (eventId) => {
    // Implement your edit logic, e.g., navigate to an edit page
    console.log(`Edit event with ID: ${eventId}`);
  };

  const handleDelete = (eventId) => {
    // Implement your delete logic
    console.log(`Delete event with ID: ${eventId}`);
  };

  const handleMoveToPage = (url) => {
    // Navigate to another page URL
    router.push(url);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {events.map((event) => (
        <Link href={`/my-events/ticketsales?eventurl=${event.eventURL}`} key={event._id}>
        <div className=''>
        <div className='flex justify-between items-start gap-5'>
        <div key={event._id} className="bg-white p-4 rounded-md shadow-md">
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image
            src="https://unpkg.com/@icon/icofont/icons/book.svg"
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
            <p className="text-sm text-gray-500">More</p>
            <span className="text-sm text-indigo-600">{event.eventName}</span>
          </div>
          <div className="mt-4 flex items-center justify-between">
              {/* Button to edit */}
              <button
                onClick={() => handleEdit(event._id)}
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
              <button
                onClick={() => handleMoveToPage(`/ticketsales?event=${event.eventURL}&id=${event.creator._id}`)}
                className="text-sm text-indigo-600 cursor-pointer"
              >
                See Ticket Sales
              </button>
            </div>
        </div>
        
        </div>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default EventList;

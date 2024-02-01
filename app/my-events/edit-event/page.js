"use client";   
import Link from "next/link";
import { useState } from 'react';
import { useSession } from "next-auth/react";
import UploadWidget from '@components/UploadWidget';
import { usePathname, useRouter } from "next/navigation";

export default function Example() {

  const router = useRouter();
  const { data: session } = useSession();

  const editData = JSON.parse(sessionStorage.getItem('myEditData'));

  console.log("editData");
  console.log(editData);

  const [form, setForm] = useState({
    event_name: editData.eventName,
    event_url: editData.eventURL,
    event_key: '',
    event_email: editData.eventEmail,
    eventWebsite: editData.eventWebsite,
    event_description: editData.eventDescription,
    event_dates: editData.eventDate,
    event_end_date: '',
    event_start_time: '',
    event_end_time: '',
    event_address: '',
    event_street: '',
    event_city: '',
    event_state: '',
    event_zip: '',
    event_country: '',
    event_image: '',
    event_cover_image: ''
  });


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        eventURL: form.event_url,
        eventKey: form.event_key,
        eventName: form.event_name,
        eventEmail: form.event_email,	  
        creator: session?.user.id,
        eventDescription: form.event_description,
        eventDate: form.event_dates,
        //event_image: form.event_image,
        eventFotoURL: childParameter,
        eventAdress: form.event_street+" "+form.event_city+" "+form.event_state+" "+form.event_zip+" "+form.event_country,
        eventWebsite: form.eventWebsite,
        createdAt: Date.now(),
      };

      if (session?.user.id) {


     
      console.log("Sending data to API...", body);

      const response = await fetch("/api/event/edit", {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({ "Content-Type": "application/json"}),
      });

      if (response.ok) {
        console.log(response)
        router.push("/my-events");
      }
      } else {
        alert("You must be logged in first to submit an Event.");
        console.log("User not logged in");
      }
    } catch (error) {
      console.log("Error sending data to API:");
      console.log(error);
    } finally {
      console.log("Finally");
    }


  }
  
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: type === 'checkbox' ? checked : value,
    }));
   
  };

  const [childParameter, setChildParameter] = useState(null);

  const handleChildParameter = (parameter) => {
    // Handle the parameter received from the child component
    setChildParameter(parameter);
  };


  return (
    <div className="bg-white shadow sm:rounded-lg py-4 m-2">
    <form 
    id="form_message"
    onSubmit={handleFormSubmit}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h1 className="text-base font-semibold leading-7 text-gray-900">Event Registration</h1>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Please fill out all fields to register your event.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Event URL for My Ticket Website
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">http://my-event-ticket.de/event/</span>
                  <input
                    type="text"
                    name="event_url"
                    id="event_url"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="example-bachata-festival-2023"
                    value={form.event_url}
                    onChange={handleChange}
                    
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Event Name 
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="event_name"
                  id="event_name"
                  placeholder="Example: German Bachata Festival 2023"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={form.event_name}
                  onChange={handleChange}  
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Event Website
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="eventWebsite"
                  id="eventWebsite"
                  placeholder="Example: https://www.bachata-festival.de"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={form.eventWebsite}
                  onChange={handleChange}  
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Event Dates
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="event_dates"
                  id="event_dates"
                  value={form.event_dates}
                  onChange={handleChange}  
                  placeholder="Example: January 1 - 3, 2023"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Event Description
              </label>
              <div className="mt-2">
                <textarea
                  id="event_description"
                  name="event_description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={form.event_description}
                  onChange={handleChange}  
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the Event.</p>
            </div>

            <div className="col-span-full">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Cover Image
            </label>
            <UploadWidget  onParameterChange={handleChildParameter} />
            {childParameter && (
              <div className="mt-2">
                <p>Foto uploaded successfully:</p>
                <input
                  type="text"
                  name="eventFotoURL"
                  id="eventFotoURL"
                  className="cursor-not-allowed block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={childParameter}
                  readOnly
                />
              </div>
          )}
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Event Stripe Key</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Here you insert the Only Read Stripe Key. With this key the programm will be able to read information from Stripe.</p>
          <div className="col-span-full">
              <div className="mt-2">
                <input
                  type="text"
                  name="event_key"
                  id="event_key"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={form.event_key}
                  onChange={handleChange}
                />
              </div>
            </div>


          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
    


            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="event_email"
                  name="event_email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={form.event_email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div> */}

            <div className="col-span-full">
              <h2 className="text-base font-semibold leading-6 text-gray-900">Event Address</h2>
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
               Street
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="event_street"
                  id="event_street"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={form.event_street}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="event_city"
                  id="event_city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={form.event_city}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State & Country
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="event_country"
                  id="event_country"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={form.event_country}
                  onChange={handleChange}
              />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="event_zip"
                  id="event_zip"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={form.event_zip}
                  onChange={handleChange}
                />
              </div>
            </div>

          </div>
        </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link href="/"><button type="button" className="btn text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button></Link>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Edit Event
        </button>
        <p className="mt-1 text-sm leading-6 text-gray-600">
            Please fill out all fields before.
          </p>
      </div>
      </div>
    </form>
  </div>
  )
}

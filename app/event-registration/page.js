"use client";   
import Link from "next/link";
import { useState } from 'react';
import { useSession } from "next-auth/react";

export default function Example() {

  const { data: session } = useSession();

  const [form, setForm] = useState({
    event_name: '',
    event_url: '',
    event_key: '',
    event_email: '',
    event_description: '',
    event_dates: '',
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
    console.log(form);

    try {
      const body = {
        eventURL: form.event_url,
        eventKey: form.event_key,
        eventName: form.event_name,
        eventEmail: form.event_email,	  
        creator: session?.user.id,
        eventDescription: form.event_description,
        eventDate: form.event_dates,
        eventAdress: form.event_street+" "+form.event_city+" "+form.event_state+" "+form.event_zip+" "+form.event_country,

        createdAt: Date.now(),
      };

    
      console.log("Sending data to API...", body);

      const response = await fetch("/api/event", {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({ "Content-Type": "application/json"}),
      });

      if (response.ok) {
        console.log(response)
        // router.push("/");
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
                Event URL
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
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  {/* <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" /> */}
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
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
          Save
        </button>
      </div>
      </div>
    </form>
  </div>
  )
}

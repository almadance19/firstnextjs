"use client"
import { CldImage } from 'next-cloudinary';

export default function EventPage() {

    //const receivedData = router.query.data ? JSON.parse(router.query.data) : null;
    const receivedData = JSON.parse(sessionStorage.getItem('myData'));
    const event_data = JSON.stringify(receivedData)

    return (
        <>
        <section className='w-full'>
    <div className='primary-content '>
        <CldImage
            src={receivedData.eventFotoURL}
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
            <span className='blue_gradient'>{receivedData.eventName}</span>
        </h1>
        <p className='desc text-left'>
         <strong>Event Date: </strong>{receivedData.eventDate}
        </p>

        <h2 className='font-bold  desc text-left'>Website</h2>
        <a href={receivedData.eventWebsite} target="_blank" rel="noopener noreferrer">
            <p className='desc text-left'>
            {receivedData.eventWebsite}
            </p>
        </a> 
        <h2 className='font-bold  desc text-left'>Organiser Email</h2>
        <p className='desc text-left'>
        {receivedData.eventEmail}
        </p>

        <h2 className='font-bold  desc text-left'>Description</h2>
        <p className='desc text-left'>
        {receivedData.eventDescription}
        </p>

        <h2 className='font-bold  desc text-left'>Location Address</h2>
        <p className='desc text-left'>
        {receivedData.eventAdress}
        </p>


        <h2 className='font-bold  desc text-left'>Ready to Get Started?</h2>
        <p className='desc text-left'>
        Buy Tickets on the Website!
        </p>
        <div className='primary-content py-4 my-2'>
        <a href={receivedData.eventWebsite} className='desc text-left'>
        <button className="btn btn-success">Go to Website</button>
        </a>  
            </div>
        </div>
    </section>
        </>
    );
}

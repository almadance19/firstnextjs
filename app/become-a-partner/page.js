import Link from 'next/link';

const PartnersPage = () => {
  return (
    <section className='w-full'>
    <div className='primary-content '>
    <h1 className='head_text text-left'>
        <span className='blue_gradient'>Welcome Potential Partner!</span>
    </h1>
      <p className='desc text-left'>
        Thank you for considering our platform to sell your event tickets. We are excited to collaborate with you.
      </p>

      <h2 className='font-bold  desc text-left'>Company Goals</h2>
      <p className='desc text-left'>
        Our company is dedicated to providing a seamless and efficient platform for event organizers to sell tickets,
        reach a wider audience, and make their events a great success.
      </p>

      <h2 className='font-bold  desc text-left'>Benefits of Selling Tickets with Us</h2>
      <ul>
        <li className='desc text-left'>Increased Visibility: Reach a larger audience through our platform.</li>
        <li className='desc text-left'>Easy Management: Effortlessly manage and track your ticket sales.</li>
        <li className='desc text-left'>Secure Transactions: Ensure secure and reliable payment transactions.</li>
        <li className='desc text-left'>Customization: Customize your event page to reflect your brand and style.</li>
        <li className='desc text-left'>Marketing Support: Leverage our marketing tools to promote your event.</li>
      </ul>

      <h2 className='font-bold  desc text-left'>Ready to Get Started?</h2>
      <p className='desc text-left'>
       Step 1: Sign in / Login to create a user!
      </p>
      <div className='primary-content py-4 my-2'>
    <Link  href="/become-a-partner/event-registration">
        <button className="btn btn-success">Sign in / Login</button>
    </Link>
        </div>
      
      <p className='desc text-left'>
       Step 2: Register your event with us today and start selling tickets!
      </p>
      <div className='primary-content py-4 my-2'>
    <Link  href="/become-a-partner/event-registration">
        <button className="btn btn-success">Register Your Event</button>
      </Link>
        </div>
    </div>
    </section>
  );
};

export default PartnersPage;
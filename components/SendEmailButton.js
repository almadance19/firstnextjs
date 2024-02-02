import React from 'react';

const SendEmailButton = ({data}) => {
  //CREATE GET REQUEST TO GOOGLE SHEET API
  // Add EMAIL, LINK, NAME, EVENTNAME and send it as Parameters
  console.log("email",data);


  
  const  handleSendEmail = async () => {
    const URL = "https://script.google.com/macros/s/AKfycbyFmNvafsmVqbRyvpESJRe4XLMd24TFOEdn7tDAagixS0WOM6ZLoQ8MKB_fh7Wku-Q/exec";
        
    const eventURL = data.CheckoutData.eventURL;
    const eventName = data.CheckoutData.eventName;
    const ticket_id = data.CheckoutData.ticket_id;
    const ticket_nr = data.CheckoutData.ticket_nr;
    const email = data.CheckoutData.email;
    const name_payment = data.CheckoutData.name_payment;
    const name_ticket = data.CheckoutData.name_ticket;
    const ticket_type = data.CheckoutData.ticket_type;
    const pre_total = data.CheckoutData.pre_total;
    let google_string= `${URL}?eventURL=${eventURL}&eventName=${eventName}&ticket_id=${ticket_id}&ticket_nr=${ticket_nr}&email=${email}&name_payment=${name_payment}&name_ticket=${name_ticket}&ticket_type=${ticket_type}&pre_total=${pre_total}`;
    


        console.log('Sending email...',google_string);
        const response = await fetch(google_string);
        const data = await response.json();
        console.log('Email sent.', data);
        if (!data.ok) {
          throw new Error(`Failed to send Email. Status: ${data}`);
        } else {
          alert("Ticket sent to your Email: "+email)
        }
      
    };

  return (
    <div>
      <button className='btn btn-active btn-secondary' onClick={handleSendEmail}>Send Ticket to Email</button>
      {/* Your other page content */}
    </div>
  );
};

export default SendEmailButton;
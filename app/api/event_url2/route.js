import Event from "@models/event";
import { Stripe } from 'stripe';
import Ticket from "@models/ticket";


import { connectToDB } from "@utils/database";

export const POST = async (request) => {

    const { eventURL, id , type, creator} = await request.json();
    console.log("URL:",eventURL);
    console.log("ID:",id);
    console.log("TYPE:",type);

    try {
        await connectToDB();
        // check if user already exists

        let EventExists = await Event.findOne({ eventURL: eventURL });

        // const EventExists = await Event.findOne({ eventURL: eventURL }).select({
        //     eventName: 1, // Exclude
        //     eventURL: 1, // Include
        //     eventKey: 0, // Exclude 
        //     creator: 0, // Exclude 
        //     _id: 0,    // Exclude 
        //   });

        if (!EventExists) {
            consonle.log("Event does not Exists");
            
            return new Response(JSON.stringify("URL DOES NOT EXISTS OR IS WRONG"), { status: 201 })

        } else {
      

            let eventKey = EventExists.eventKey;
            console.log("Event Key",eventKey);

            if (!eventKey) {
                console.log("Event Key does not exist");
                return new Response(JSON.stringify("NO KEY IN SYSTEM"), { status: 201 })
            } else {
                console.log("Event Key exist");

                const stripe = new Stripe(eventKey, {
                    apiVersion: '2020-08-27', // Replace with the desired API version
                });

                try {
                    const stripeResponse = await stripe.checkout.sessions.retrieve(id) ;
                
                    if (!stripeResponse) {
                        console.log("Stripe Response does not exist");
                        return new Response(JSON.stringify("NO STRIPE RESPONSE"), { status: 201 });
                    }  else {

                        console.log("Stripe Response exist");
        
                        var pre_total = Number(stripeResponse["amount_total"])/100;
                        var total = (pre_total).toFixed(2);
                        var pre_mwst = (total/1.19)*.19 ;
                        var mwst = (pre_mwst).toFixed(2);
                  
                        const CheckoutData = {
                            created_at: stripeResponse["created"],
                            ticket_id: id,
                            ticket_nr: id.slice(-10),
                            email: stripeResponse["customer_details"].email,
                            name_payment: stripeResponse["customer_details"].name,
                            subtotal: stripeResponse["amount_subtotal"],
                            pre_total: Number(stripeResponse["amount_total"]) / 100,
                            total: (pre_total).toFixed(2),
                            pre_mwst: (total / 1.19) * 0.19,
                            mwst: (pre_mwst).toFixed(2),
                            subtotal: total - mwst,
                            amount_discount: Number(stripeResponse["total_details"].amount_discount) / 100,
                            name_ticket: stripeResponse["custom_fields"][0].text.value,
                            paystatus: stripeResponse["payment_status"],
                            ticket_type: stripeResponse["metadata"].Tickettype,
                            address: `${stripeResponse["customer_details"]["address"].line1} ${stripeResponse["customer_details"]["address"].line2}, ${stripeResponse["customer_details"]["address"].postal_code} ${stripeResponse["customer_details"]["address"].city}, ${stripeResponse["customer_details"]["address"].country}`,
                            phone: `Phone= ${stripeResponse["customer_details"].phone}`,
                            currency: stripeResponse["currency"],
                          };
        
                          EventExists = await Event.findOne({ eventURL: eventURL }).select({
                            eventKey: 0, // Exclude
                             });
                  
                          console.log(CheckoutData);


                          if (CheckoutData) {
                                console.log("CheckoutData exist");
                                  if (type === "org") {
                                    CheckoutData.creator = creator;
                                  } else if (type === "buyer") {
                                    CheckoutData.creator = creator;
                                  }
                    
                              CheckoutData.eventURL = eventURL ;
                              CheckoutData.eventName = EventExists.eventName ;
                              CheckoutData.eventOrganiserId = EventExists.creator ;
        
                            console.log("Saving Ticket in DB...", CheckoutData);
                    
                            try {
                                console.log("SAVE TICKET");
                                // check if user already exists
                                const ticketExists = await Ticket.findOne({ ticket_id: id });
                                // if not, create a new document and save user in MongoDB
                                if (!ticketExists) {
                                    const creator = CheckoutData.creator;
                                    const eventURL = CheckoutData.eventURL;
                                    const eventName = CheckoutData.eventName;
                                    const eventOrganiserId = CheckoutData.eventOrganiserId;
                                    const created_at = CheckoutData.created_at;
                                    const ticket_id = CheckoutData.ticket_id;
                                    const ticket_nr = CheckoutData.ticket_nr;
                                    const email = CheckoutData.email;
                                    const name_payment = CheckoutData.name_payment;
                                    const pre_total = CheckoutData.pre_total;
                                    const total = CheckoutData.total;
                                    const pre_mwst = CheckoutData.pre_mwst;
                                    const mwst = CheckoutData.mwst;
                                    const subtotal = CheckoutData.subtotal;
                                    const amount_discount = CheckoutData.amount_discount;
                                    const name_ticket = CheckoutData.name_ticket;
                                    const paystatus = CheckoutData.paystatus;
                                    const ticket_type = CheckoutData.ticket_type;
                                    const address = CheckoutData.address;
                                    const phone = CheckoutData.phone;
                                    const currency = CheckoutData.currency;

                                    const newTicket = new Ticket({
                                        creator,
                                        eventURL,
                                        eventName,
                                        eventOrganiserId,
                                        created_at,
                                        ticket_id,
                                        ticket_nr,
                                        email,
                                        name_payment,
                                        pre_total,
                                        total,
                                        pre_mwst,
                                        mwst,
                                        subtotal,
                                        amount_discount,
                                        name_ticket,
                                        paystatus,
                                        ticket_type,
                                        address,
                                        phone,
                                        currency});
                                    await newTicket.save();
                                    
                                    console.log("Ticket saved");
                                                            
                                } else {
                                    console.log("Ticket already in the System");
                                }
                            } catch (error) {
                                console.log("Failed to create a new prompt", error);
                                return new Response("Failed to create a new prompt", { status: 500 });
                            }
                          

                          return new Response(JSON.stringify({ EventExists, CheckoutData }), { status: 201 });
                        } else {
                            console.error('NO DATA STRIPE DATA VORHANDEN');
                            return new Response(JSON.stringify("NO DATA STRIPE DATA"), { status: 201 });
                          } 
                        }
                
                } catch (error) {
                    console.error('Error retrieving Stripe session:', error);
                
                    // Handle the error, for example, by returning a response with an error status
                    return new Response(JSON.stringify("Error retrieving Stripe session"), { status: 500 });
                }
            }

        }
    } catch (error) {
        console.log("ERROR");
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}



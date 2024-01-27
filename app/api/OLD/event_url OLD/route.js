import Event from "@models/event";
import { Stripe } from 'stripe';


import { connectToDB } from "@utils/database";

export const POST = async (request) => {

    const { eventURL, id , type} = await request.json();
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
                          return new Response(JSON.stringify({ EventExists, CheckoutData }), { status: 201 });
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



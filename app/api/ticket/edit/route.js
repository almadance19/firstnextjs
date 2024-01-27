import Ticket from "@models/ticket";

import { connectToDB } from "@utils/database";



export const POST = async (request) => {
    const { email, name_ticket , ticket_type, ticket_nr, ticket_id} = await request.json();

    console.log("name_ticket: ", name_ticket);


    try {
  
       await connectToDB();

        // Find the existing Ticket by ID
        
        //const existingTicket = await Ticket.findOne({ ticket_id: ticket_id})
        const existingTicket = await Ticket.findOneAndUpdate(
            {ticket_id: ticket_id},
            { $set: { email: email,name_ticket: name_ticket, name_ticket: name_ticket}}
        )

        if (!existingTicket) {
            console.log("Ticket not found");
            return new Response("Ticket not found", { status: 404 });
        }
        // console.log("existingTicket: ", existingTicket);
        // // Update the Ticket with new data
        // existingTicket.email = email;
        // existingTicket.name_ticket = name_ticket;
        // existingTicket.ticket_type = ticket_type;
        // console.log("New Name: ", existingTicket.name_ticket);
        // console.log("existingTicket: ", existingTicket)
        //await existingTicket.save();

        return new Response("Successfully updated the Tickets", { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error Updating Ticket", { status: 500 });
    }
};
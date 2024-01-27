import Ticket from "@models/ticket";

import { connectToDB } from "@utils/database";

export const POST = async (request) => {


    const {
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
        currency,
      } = await request.json();
    
      console.log("SAVE TICKET",creator);
    try {
        console.log("SAVE TICKET",creator);
        await connectToDB();
        // check if user already exists
        const ticketExists = await Ticket.findOne({ ticket_id: ticket_id });

        // if not, create a new document and save user in MongoDB
        if (!ticketExists) {
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
            
            return new Response(JSON.stringify( ticketExists ), { status: 201 })

        } else {
            console.log("Ticket already in the System");
            return new Response("Ticket already in the System", { status: 201 })
        }
    } catch (error) {
        console.log("Failed to create a new prompt", error);
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}
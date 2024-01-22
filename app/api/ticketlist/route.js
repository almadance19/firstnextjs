import Ticket from "@models/ticket";
import Event from "@models/event";

import { connectToDB } from "@utils/database";

export const POST = async (request) => {

    const {
        session,
        eventid,
      } = await request.json();

      
    try {
        console.log("SEARCH ORG TICKETS",session,eventid);
        await connectToDB();
        // check if user already exists
        const ticketExists = await Ticket.find({ organiser: params.id }).populate("creator")

        // if not, create a new document and save user in MongoDB
        if (!ticketExists) {
                   
            console.log("No event Tickets");
            
            return new Response(JSON.stringify( "No event Tickets" ), { status: 201 })

        } else {
            console.log("Ticket already in the System");
            return new Response("Ticket already in the System", { status: 201 })
        }
    } catch (error) {
        console.log("Failed to create a new prompt", error);
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}

import Ticket from "@models/ticket";
import { connectToDB } from "@utils/database";


export const POST = async (request) => {

    const { session, eventid } = await request.json();

    console.log("SEARCH ORG TICKETS",session,eventid);

    try {
        await connectToDB()
        console.log("HOLA");

        //change to organiser

        const prompts = await Ticket.find({ eventOrganiserId: session }).populate("creator")

        if (!prompts) {
            console.log("NO Tickets");
            return new Response(JSON.stringify("No Tickets"), { status: 201 })
        } else {
            console.log("Tickets",prompts);
            
            return new Response(JSON.stringify(prompts), { status: 201 })
        }

    } catch (error) {
        return new Response("Failed to fetch prompts owned by organiser", { status: 500 })
    }
} 

import Ticket from "@models/ticket";
import { connectToDB } from "@utils/database";


export const GET = async (request, { params }) => {
    try {
        await connectToDB()
        console.log("HOLA");

        const ticketsasuser = await Ticket.find({ creator: params.id }).populate("creator")

        if (!ticketsasuser) {
            console.log("NO Tickets as user");

            const ticketsasorganiser = await Ticket.find({ eventOrganiserId: params.id }).populate("creator")

            if (!ticketsasorganiser) {
                console.log("NO Tickets as organiser");
                return new Response(JSON.stringify("No Tickets as organiser or as user"), { status: 201 })
            } else {
                console.log("Tickets as organiser",ticketsasorganiser);
                return new Response(JSON.stringify(ticketsasorganiser), { status: 201 })
            }   

        } else {
            console.log("Tickets as user",ticketsasuser);
            return new Response(JSON.stringify(ticketsasuser), { status: 201 })
        }

    } catch (error) {
        return new Response("Failed to fetch ticketsasuser created by user", { status: 500 })
    }
} 
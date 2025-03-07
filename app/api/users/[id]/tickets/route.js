
import Ticket from "@models/ticket";
import Event from "@/models/event";
import { connectToDatabase } from '@/lib/database'


export const GET = async (request, { params }) => {
    try {
        await connectToDatabase()
        console.log("HOLA");

        const user = await User.findOne({ email: params.id });

        if (!user) {
            return new Response(JSON.stringify("No user found"), { status: 201 })
        } else {
            const ticketsasuser = await Ticket.find({ email: user.clerkId }).select({
                eventOrganiserId: 0, // Exclude
                });
    
                if (!ticketsasuser) {
                    console.log("NO Tickets as user");
                    return new Response(JSON.stringify("No Tickets as user"), { status: 201 }) 
        
                } else {
                    console.log("Tickets as user",ticketsasuser);
                    return new Response(JSON.stringify(ticketsasuser), { status: 201 })
                }
        }


    } catch (error) {
        return new Response("Failed to fetch ticketsasuser created by user", { status: 500 })
    }
} 
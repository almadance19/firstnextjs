import Ticket from "@models/ticket";

import { connectToDB } from "@utils/database";

export const POST = async (request) => {

    console.log("request.json().userId");

    const { stripID, userId, title, description,creator, createdAt  } = await request.json();

    try {
        await connectToDB();
        // check if user already exists
        const ticketExists = await Ticket.findOne({ stripID: stripID });

        // if not, create a new document and save user in MongoDB
        if (!ticketExists) {
            const newTicket = new Ticket({stripID,creator, userId, title, description, createdAt });
            await newTicket.save();
            
            return new Response(JSON.stringify(newTicket), { status: 201 })

        } else {
            return new Response("Ticket already in the System", { status: 201 })
        }
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}
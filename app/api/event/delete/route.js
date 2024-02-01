import Event from "@models/event";
//import Event from "@models/Event";

import { connectToDB } from "@utils/database";

export const POST = async (request) => {

    const { _id  } = await request.json();

    try {

        await connectToDB();

        // Find the existing Event by ID
        const existingEvent = await Event.findOne({ _id: _id });

        if (!existingEvent) {
            return new Response(JSON.stringify("EVENT ID DOES NOT EXISTS OR IS WRONG"), { status: 201 })
        } else { 
                // Find the Event by ID and remove it
                await Event.findByIdAndDelete(_id);

                return new Response(JSON.stringify("EVENT DELETED"), { status: 201 })
        }
    } catch (error) {
        return new Response("Failed to create a new Event", { status: 500 });
    }
}
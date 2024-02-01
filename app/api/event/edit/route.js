import Event from "@models/event";
//import Prompt from "@models/prompt";

import { connectToDB } from "@utils/database";

export const POST = async (request) => {

    console.log("request.json().userId");

    const { eventURL, eventKey, eventName, eventEmail, creator,createdAt,eventDescription,eventDate,eventAdress,eventFotoURL, eventWebsite   } = await request.json();

    console.log("event_image",eventFotoURL);

    try {
        await connectToDB();
        // check if user already exists
        //const EventExists = await Event.findOne({ eventURL: eventURL });

        const EventExists = await Event.findOneAndUpdate(
            {eventURL: eventURL},
            { $set: { eventURL: eventURL,eventKey: eventKey, eventName: eventName, eventEmail: eventEmail, creator: creator, createdAt: createdAt, eventDescription: eventDescription, eventDate: eventDate, eventAdress: eventAdress, eventFotoURL: eventFotoURL, eventWebsite: eventWebsite }}
        )

        // if not, create a new document and save user in MongoDB
        if (!EventExists) {
            return new Response("Event not in the System", { status: 201 })
        } 
        return new Response("Successfully updated the Event", { status: 200 });

    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}


export const GET = async (request) => {
    try {
        await connectToDB();
        const prompts = await Event.find({}).select({
            creator: 0, // Exclude
            eventKey: 0, // Exclude
            });
        console.log(prompts);
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response("Failed to get prompts", { status: 500 });
    }           
}



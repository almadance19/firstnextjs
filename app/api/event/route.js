import Event from "@models/event";
//import Prompt from "@models/prompt";

import { connectToDB } from "@utils/database";

export const POST = async (request) => {

    console.log("request.json().userId");


    const { eventURL, eventKey, eventName, eventEmail, creator,createdAt,eventDescription,eventDate,eventAdress   } = await request.json();

    try {
        await connectToDB();
        // check if user already exists
        const EventExists = await Event.findOne({ eventURL: eventURL });

        // if not, create a new document and save user in MongoDB
        if (!EventExists) {
            const newEvent = new Event({eventURL, eventKey, eventName, eventEmail, creator,createdAt,eventDescription,eventDate,eventAdress  });
            await newEvent.save();
            
            return new Response(JSON.stringify(newEvent), { status: 201 })

        } else {
            return new Response("Event already in the System", { status: 201 })
        }
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}

// export const GET = async (request, params ) => {
//     try {
//         await connectToDB();
//         console.log("event_url", params);
//         //const prompts = await Event.find({ eventURL: "response2"}).populate("creator")

//         const event = await Event.find({ eventURL: params.event_url });

//         return new Response(JSON.stringify(event), { status: 200 })
//     } catch (error) {
//         return new Response("Failed to fetch prompts created by user", { status: 500 })
//     }
// } 

// export const GET = async (request) => {
//     try {
//         await connectToDB();
//         const prompts = await Prompt.find({}).populate("creator");

//         return new Response(JSON.stringify(prompts), { status: 200 });
//     } catch (error) {
//         return new Response("Failed to get prompts", { status: 500 });
//     }           
// }


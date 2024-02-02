import Event from "@models/event";
//import Prompt from "@models/prompt";

import { connectToDB } from "@utils/database";

export const POST = async (request) => {

    console.log("request.json().userId");

    const { _id  } = await request.json();

    try {
        await connectToDB();
        // check if user already exists
        const EventExists = await Event.findOne({ _id: _id });

        // if not, create a new document and save user in MongoDB
        if (!EventExists) {
            return new Response("Event not in the System", { status: 201 })

        } else {
            console.log("Event in the System");
            return new Response(JSON.stringify(EventExists), { status: 201 })
        }
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



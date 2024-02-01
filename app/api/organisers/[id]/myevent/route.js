import Event from "@models/event.js"
;
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const prompts = await Event.find({ creator: params.id }).select({
            creator: 0, // Exclude
            eventKey: 0, // Exclude
            });


        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 
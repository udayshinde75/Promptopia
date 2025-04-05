import Prompt from "../../../../../models/prompt";
import { connectToDB } from "../../../../../utils/database";

export const GET = async ( { params }) => {
    try {
        await connectToDB();
        
        // Directly access params.id without await
        const prompts = await Prompt.find({
            creator:  params.id
        }).populate("creator");

        return new Response(JSON.stringify(prompts), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch all prompts", {
            status: 500,
        });
    }
};

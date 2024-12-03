import fs from "node:fs"

export async function deleteAudioController(request, response){
    const videoId = request.query.v;

    const __dirname = process.cwd();

    if (!videoId) {
        return response.status(400).send({error: "Missing videoId"});
    }
    try {
        console.log("[AUDIO] Deleting audio from videoId: ", videoId);
        fs.unlinkSync(__dirname + `/src/audios/${videoId}.mp3`);

        return response.status(204);
    } catch (error) {
        console.error("[AUDIO_ERROR] ", error);
        return response.status(500).send("Internal Server Error");
    }
}
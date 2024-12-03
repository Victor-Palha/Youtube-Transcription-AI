import process from "node:process";
import { downloader } from "../services/downloader.js";

// Função para obter o hostname da variável de ambiente ou localhost
const hostname = process.env.HOSTNAME || 'localhost';

export async function downloadAudioController(request, response) {
    const videoId = request.query.v;
    if (!videoId) {
        return response.status(400).send({ error: "Missing videoId" });
    }
    try {

        console.log("[AUDIO] Downloading audio from videoId: ", videoId);
        await downloader(videoId);

        // Retorna o caminho com o hostname configurado
        return response.send({
            message: "Audio downloaded and converted to mp4",
            path: `http://${hostname}:3000/audio/${videoId}.wav`
        });
    } catch (error) {
        console.error("[AUDIO_ERROR] ", error);
        return response.status(500).send("Internal Server Error");
    }
}

import youtubeDl from "youtube-dl-exec";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";

export async function downloader(videoId) {
    const videoURL = `https://www.youtube.com/watch?v=${videoId}`;
    const __dirname = process.cwd();
    const pathToAudio = `${__dirname}/src/audios/${videoId}.%(ext)s`;
    const finalOutputPath = `${__dirname}/src/audios/${videoId}.wav`;

    console.log("[PATH_SAVE]= " + pathToAudio);

    try {
        // Baixa o áudio no formato .webm
        await youtubeDl(videoURL, {
            format: "bestaudio",
            noCheckCertificates: true,
            noWarnings: true,
            addHeader: ["referer:youtube.com", "user-agent:googlebot"],
            output: pathToAudio,
        });
        console.log("[DOWNLOADER] Download finished!");

        const webmPath = pathToAudio.replace("%(ext)s", "webm");

        // Verifica se o arquivo baixado existe
        if (fs.existsSync(webmPath)) {
            // Converte o arquivo baixado para .wav
            await new Promise((resolve, reject) => {
                ffmpeg(webmPath)
                    .output(finalOutputPath)
                    .audioCodec("pcm_s16le") // Define o codec para WAV
                    .format("wav")           // Define o formato de saída
                    .on("end", () => {
                        console.log(`Converted to WAV: ${finalOutputPath}`);
                        resolve(true);
                    })
                    .on("error", (err) => {
                        console.error("Conversion to WAV failed", err);
                        reject(err);
                    })
                    .run();
            });

            // Remove o arquivo .webm original, se necessário
            fs.unlinkSync(webmPath);
        }
    } catch (error) {
        console.error("[DOWNLOADER_ERROR] ", error);
        throw new Error("Failed to download and convert audio");
    }
}

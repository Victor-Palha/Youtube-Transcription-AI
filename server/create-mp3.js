import ffmpegStatic from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';
import path from "node:path";

export const createMP3 = (videoId)=> new Promise((res, rej) => {
    ffmpeg.setFfmpegPath(ffmpegStatic)
    ffmpeg()
    .input(`./server/audios/${videoId}.mp4`)
    .outputOptions("-ab", "20k")
    .saveToFile(path.resolve() + "/server/audios/"+videoId+".mp3")
    .on("end", ()=>{
        console.log("[CREATE_MP3] MP3 Created!")
        res()
    })
    .on("error", (error)=>{
        console.error("[CREATE_MP3_ERROR] ",error)
        rej(`[CREATE_MP3_ERROR] ${error}`)
    })
})
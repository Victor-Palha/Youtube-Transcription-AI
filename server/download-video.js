import ytdl from 'ytdl-core';
import fs from 'fs';
import path from 'node:path';


export const downloader = (videoId) => new Promise((res, rej) => {
    const videoURL = `https://www.youtube.com/watch?v=${videoId}`
    const pathToAudio = path.resolve() + `/server/audios/${videoId}.mp4`
    ytdl(videoURL, {
        quality: "lowestaudio",
        filter: "audioonly",
    })
    .on("end", ()=>{
        console.log("[DOWNLOADER] Download finished!")
        res()
    })
    .on("error", (error)=>{
        console.error("[DOWNLOADER_ERROR] ",error)
        rej(`[DOWNLOADER_ERROR] ${error}`)
    })
    .pipe(fs.createWriteStream(pathToAudio))
})
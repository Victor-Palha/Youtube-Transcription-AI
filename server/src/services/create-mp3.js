import ffmpegStatic from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';

export const createMP3 = (videoId)=> new Promise((res, rej) => {
    const __dirname = process.cwd();
    ffmpeg.setFfmpegPath(ffmpegStatic)
    ffmpeg()
    .input(__dirname + `/src/audios/${videoId}.mp4`)
    .outputOptions("-ab", "20k")
    .saveToFile(__dirname + "/src/audios/"+videoId+".mp3")
    .on("end", ()=>{
        console.log("[CREATE_MP3] MP3 Created!")
        res()
    })
    .on("error", (error)=>{
        console.error("[CREATE_MP3_ERROR] ",error)
        rej(`[CREATE_MP3_ERROR] ${error}`)
    })
})
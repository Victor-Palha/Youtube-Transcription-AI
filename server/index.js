import Express from "express";

import cors from "cors"
import { downloader } from "./download-video.js";
import { createMP3 } from "./create-mp3.js";

const app = Express()
app.use(cors())


app.get("/audio", async (req, res)=>{
    const videoId = req.query.v
    try {
        console.log("[AUDIO] Downloading audio from videoId: ", videoId)
        await downloader(videoId).then(async ()=>{
            await createMP3(videoId)
        })
        return res.send({ok: true})
    } catch (error) {
        console.error("[AUDIO_ERROR] ",error)
        return res.status(500).send("Internal Server Error")
    }
})

app.listen(3003, () => {
    console.log("Server is running on port 3003")
})
import axios from "axios"
import { startLoading, stopLoading, loadingMessage } from "./loading"
import { getVideoId, loadVideo } from "./youtube-api"
import { transcribeAudio } from "./transcribe"
import { renderText } from "./render"

const form = window.document.querySelector("#form")

form.addEventListener("submit", async (event)=>{
    event.preventDefault()
    
    try {
        loadingMessage("Iniciando descriptografia do vídeo...")
        startLoading()
        const formData = new FormData(form)
        const url = formData.get("url")
        await loadVideo(url)

        loadingMessage("Carregando o áudio do vídeo!")
        const response = await axios.get("https://api.victor-palha.com/audio", {
            params: {
                v: getVideoId(url)
            }
        })

        console.log(response.data)
        const data = await transcribeAudio(response.data.path)        

        renderText(data)
    } catch (error) {
        console.error("[SUBMIT_ERROR] ",error)
    } finally{
        stopLoading()
        await axios.delete("https://api.victor-palha.com/audio", {
            params: {
                v: getVideoId(url)
            }
        })
    }
})
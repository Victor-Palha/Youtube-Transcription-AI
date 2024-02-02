import axios from "axios"
import { startLoading, stopLoading, loadingMessage } from "./loading"
import { getVideoId, loadVideo } from "./youtube-api"

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
        await axios.get("http://localhost:3003/audio", {
            params: {
                v: getVideoId(url)
            }
        })
    } catch (error) {
        console.error("[SUBMIT_ERROR] ",error)
    } finally{
        stopLoading()
    }
})
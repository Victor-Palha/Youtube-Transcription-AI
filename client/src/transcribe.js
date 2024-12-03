import { pipeline } from "@xenova/transformers";
import { loadingMessage } from "./loading.js";
import {WaveFile} from 'wavefile';
import { env } from '@xenova/transformers';

env.allowLocalModels = false;
env.useBrowserCache = false;
// import data from './data.json'
var data = null


export async function transcribeAudio(pathVideo) {
  console.log(pathVideo)
  const options = {
    chunk_length_s: 30, 
    stride_length_s: 5,
    task: 'transcribe',
    return_timestamps: true,
  }

  try {
    console.time()
    loadingMessage('Iniciando a transcrição de áudio, essa etapa é bem demorada... aguarde')
    console.log('[START_TRANSCRIBE] - ', pathVideo)
    // Carrega o modelo de transcrição
    const transcriber = await pipeline('automatic-speech-recognition');
    // data = transcribeAudio(audioData, options);
    data = transcriber(pathVideo, options);

  } catch (error) {
    console.log('[ERROR_TRANSCRIBE] ', error)
    throw new Error(error)

  } finally {
    console.timeEnd()
    loadingMessage('Transcrição terminada!')
    console.log('[STOP_TRANSCRIBE]')
    return data
  }

}
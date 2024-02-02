import { loadingMessage } from "./loading";

// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.YTPlayer = null

export function getVideoId(url){
    const urlParams = new URLSearchParams(new URL(url).search)
    return urlParams.get("v")
}

export function loadVideo(url){
    loadingMessage("Carregando o vídeo do YouTube!")

    return new Promise((res, _rej) => {
        window.YTPlayer = new YT.Player("youtubeVideo", {
            videoId: getVideoId(url),
            events: {
                'onReady': res(),
            //     'onStateChange': onPlayerStateChange
            }
        })
    })
}
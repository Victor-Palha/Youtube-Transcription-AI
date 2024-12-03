const renderChunk = ({timestamp, text})=>`
    <div class="chunk flex">
        <time class="flex">${getMinutes(timestamp)}</time>
        <p>
            ${grupedText(text, timestamp)}
        </p>
    </div>
`

function getMinutes(timestamp){
    let date = new Date(null)
    date.setTime(timestamp[0]*1000)
    return date.toISOString().slice(14, 19)

}

window.seek = function(event){
    const seekTo = event.currentTarget.dataset.seekTo

    window.YTPlayer.seekTo(seekTo)
    window.YTPlayer.playVideo()
}

function grupedText(text, timestamp){
    const words = text.split(" ")

    const group = []
    for(let index = 0; index < words.length; index++){
        if(index % 3 === 0){
            group.push(words.slice(index, index + 3).join(" "))
        }
    }

    return group.map((item, index)=> {
        const [initialTime, finalTime] = timestamp
        const seekTo = index == 0 ? initialTime : (((finalTime - initialTime) / (group.length - index)) + initialTime)


        return `<span onclick=seek(event) data-seek-to="${seekTo}">${item} </span>`
    }).join("")
}


export function renderText({chunks}){
    const formattedTranscription = chunks.map(renderChunk).join("")
    document.querySelector(".transcription .content").innerHTML = formattedTranscription
}
export function startLoading(){
    window.document.documentElement.classList.add("loading")
}

export function stopLoading(){
    window.document.documentElement.classList.remove("loading")
}

export function loadingMessage(msg){
    window.document.documentElement.dataset.message = msg
}
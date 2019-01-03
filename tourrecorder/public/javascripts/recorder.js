window.addEventListener("message", receiveMessage, false);

function receiveMessage(event){
    console.log('cross domain done: ');
    console.log(event.data);
}
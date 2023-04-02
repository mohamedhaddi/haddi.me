const url1 = 'https://raw.githubusercontent.com/cmuratori/misc/main/cleancodeqa.md';
const url2 = 'https://raw.githubusercontent.com/cmuratori/misc/main/cleancodeqa-2.md';
const markdownConverter = new showdown.Converter();

async function init(url) {
    return fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.text()
    })
    .then(markdownChat => {
        const chat = document.getElementById('chat');
        const messages = markdownChat.split(/(?=^\*\*casey:*\*\*:*|^\*\*bob:*\*\*:*)/gim);
        messages.forEach(message => {
            const bubble = document.createElement('div');
            const name = message.slice(0, 7).toLowerCase().startsWith('**casey') ? 'casey' : 'bob';
            bubble.classList.add(name, 'bubble');
            bubble.innerHTML = markdownConverter.makeHtml(message);
            chat.appendChild(bubble);
        });
    })
}

init(url1)
.then(() => init(url2))
.catch(error => {
    const chat = document.getElementById('chat');
    const errorBubble = document.createElement('div');
    errorBubble.classList.add('error', 'bubble');
    const errorMessage = document.createElement('p');
    errorMessage.innerText = 'Something went wrong. Try again later or report the issue at ';
    const errorLink = document.createElement('a');
    errorLink.href = 'https://github.com/mohamedhaddi/haddi.me/issues';
    errorLink.innerText = 'GitHub';
    errorMessage.appendChild(errorLink);
    errorMessage.appendChild(document.createTextNode('.'));
    errorBubble.appendChild(errorMessage);
    chat.appendChild(errorBubble);
    console.error(error);
});
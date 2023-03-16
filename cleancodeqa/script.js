fetch('https://raw.githubusercontent.com/cmuratori/misc/main/cleancodeqa.md')
    .then(response => response.text())
    .then(text => {
        const messages = text.split(/(?=^\*\*casey:*\*\*:*|^\*\*bob:*\*\*:*)/gim);
        const converter = new showdown.Converter();
        const chat = document.getElementById('chat');
        messages.forEach(message => {
            const bubble = document.createElement('div');
            const name = message.slice(0, 7).toLowerCase().startsWith('**casey') ? 'casey' : 'bob';
            bubble.classList.add(name, "bubble");
            bubble.innerHTML = converter.makeHtml(message);
            chat.appendChild(bubble);
        });
    })
    .catch(error => console.error(error));
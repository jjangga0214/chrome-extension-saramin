chrome.runtime.onInstalled.addListener(() => {
    console.log('chrome-extension-saramin: background.js is loaded');
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        //hostEquals: 'developer.chrome.com',
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {
                    hostEquals: 'www.saramin.co.kr',
                },
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});


function loadCandidateContact() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const color = 'black';
        const uuid = 'this-is-the-unique-id-sjasldfhb';
        const callOnOriginalContext = `changeColor(\\'${color}\\');`;
        code = `
        const newBtn = '<button style="display: none" id="${uuid}" onclick="${callOnOriginalContext}">click this</button>';
        document.querySelector('body').innerHTML += newBtn;
        document.querySelector('#${uuid}').click();`;

        code = `
        (function(){
            const command = document.querySelector('a[href^="javascript:useMandb("]').href.substr(11);
            const newBtn = '<button style="display: none" id="${uuid}" onclick="'+command+'">click this</button>';
            document.querySelector('body').innerHTML += newBtn;
            document.querySelector('#${uuid}').click();
        })();`;
        chrome.tabs.executeScript(
            tabs[0].id,
            {code});
    });
}
`
hdsearch
    hd5684415#
`
chrome.commands.onCommand.addListener(function (command) {
    console.log('Command:', command);
    if (command == "candidate-contact-load") {
        loadCandidateContact();
    }
});
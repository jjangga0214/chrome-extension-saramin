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

function executeOnDOM(code) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code});
    });
}

// min (포함) 과 max (불포함) 사이의 임의 정수를 반환
// Math.round() 를 사용하면 고르지 않은 분포를 얻게된다!
function getRandomInt({
                          min = 0,
                          max = 1000000,
                      } = {}) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function loadCandidateContact() {
    const uuid = `chrome-extension-saramin-loadCandidateContact-${getRandomInt()}`;
    const code = `
        (function(){
            const command = document.querySelector('a[href^="javascript:useMandb("]').href.substr(11);
            const newBtn = '<button style="display: none" id="${uuid}" onclick="'+command+'">click this</button>';
            document.querySelector('body').innerHTML += newBtn;
            document.querySelector('#${uuid}').click();
        })();`;
    executeOnDOM(code);
    setTimeout(copyCandidateEmail, 100);
}

function copy(parsingCode) {
    const uuid = `chrome-extension-saramin-${getRandomInt()}`;
    const code = `
    (function(){
        const data = ${parsingCode};
        const newTextArea = '<textarea id="${uuid}">'+data+'</textarea>';
        document.querySelector('body').innerHTML += newTextArea;
        document.querySelector('#${uuid}').select();
        document.execCommand('copy');
    })();`;
    console.log('copy:', code);
    executeOnDOM(code);
}

function copyCandidateEmail() {
    const parsingCode = `
    (function(){
        var element = document.querySelector('li.mail>span');
        if(!element){
            return '이메일없음';
        }
        return element.innerHTML;
    })();`;

    copy(parsingCode);
}

function copyCandidatePhone() {
    const code = `
    (function(){
        var element = document.querySelector('a[resume-action="sendSMS"]')||document.querySelector('li.tel>span');
        if(!element){
            return '연락처없음';
        }
        return element.innerHTML;
    })();`;
    copy(code);
}

chrome.commands.onCommand.addListener((command) => {
    console.log('Command:', command);
    if (command == "candidate-contact-load") {
        loadCandidateContact();
    } else if (command == "candidate-email-copy") {
        copyCandidateEmail();
    } else if (command == "candidate-phone-copy") {
        copyCandidatePhone();
    }
});
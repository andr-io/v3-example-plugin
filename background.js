chrome.action.onClicked.addListener(handler);

function handler(tab) {
    chrome.tabs.create({url: "https://wikipedia.org", active: false}, exec);
}


async function exec(tab) {  
    await chrome.scripting.executeScript({
        target : {tabId : tab.id,},
        files : ["foreground.js"]
    });

    setTimeout(() => chrome.scripting.executeScript({
        target : {tabId : tab.id},
        files : ["alert.js"]
    }), 200);
}
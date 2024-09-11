chrome.action.onClicked.addListener(handler);

function handler(tab) {
    chrome.tabs.create({url: "https://wikipedia.org"}, exec);
}

function exec(tab) {  
    chrome.scripting.executeScript({
        target : {tabId : tab.id, allFrames : true},
        files : ["foreground.js"]
    });
    
}
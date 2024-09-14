chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({url: "https://wikipedia.org", active: false})
});

chrome.webNavigation.onCompleted.addListener(
    details => {exec(details.tabId);}
);

function exec(id) {
    state[id] = state[id] || 0;

    switch (state[id]) {
        case 0:
            state[id]++;
            chrome.scripting.executeScript({
                target : {tabId : id},
                files : ["foreground.js"]
            });
            break;
    
        case 1:
            state[id]++;
            chrome.scripting.executeScript({
                target : {tabId : id},
                files : ["alert.js"]
            });
            break;
    }
}

let state = {};
(async () => {
    let state;
    let ownedTabs;

    await chrome.storage.session.get(["state", "ownedTabs"], data => {
        const {'state': s, 'ownedTabs': t} = data;

        state = s || {};
        ownedTabs = new Set(t);
    });

    chrome.action.onClicked.addListener(() => {
        chrome.tabs.create({url: "https://wikipedia.org", active: false}, tab => ownedTabs.add(tab.id))
    });

    chrome.webNavigation.onCompleted.addListener(
        details => {
            const id = details.tabId
            if (ownedTabs.has(id)) {
                exec(id);
            }
        }
    );

    function exec(id) {
        state[id] = state[id] || 0;

        switch (state[id]++) {
            case 0:
                chrome.scripting.executeScript({
                    target : {tabId : id},
                    files : ["foreground.js"]
                });
                break;
        
            case 1:
                chrome.scripting.executeScript({
                    target : {tabId : id},
                    files : ["alert.js"]
                });
                break;
        }

        chrome.storage.session.set({
            state: state,
            ownedTabs: [...ownedTabs]
        });
    }
})();
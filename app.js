chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    hijack(tab);
});

function hijack(tab) {
    chrome.tabs.executeScript({
         file: 'redirect.js'
    }, _ => {
        if (chrome.runtime.lastError !== undefined) {
            console.log(chrome.runtime.lastError.message);
        }
    });
}

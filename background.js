importScripts("./tools.js");

chrome.tabs.onActivated.addListener(({ tabId, windowId }) => {
    console.log({ tabId, windowId });
    chrome.tabs.get(tabId, async ({ url }) => {
        // console.log({ url });
        if (url.includes('meet.google.com')) {
            await chrome.action.enable();
            // console.log('Enable called');
        } else {
            await chrome.action.disable();
            // console.log('Disabled called');
        }
    })

});

const meet_rule = {
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostPrefix: 'meet.google.com' },
        }),
    ],
    actions: [
        chrome.action.enable(),
    ],
}

var rule1 = {
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'www.google.com', schemes: ['https'] },
            css: ["input[type='password']"]
        })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
};

chrome.runtime.onInstalled.addListener(function (details) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([rule1]);
    });
});
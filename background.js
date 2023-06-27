
let isLooping = false;
let currentTabId = null;

chrome.browserAction.onClicked.addListener(function(tab) {
  if (isLooping) {
    chrome.tabs.executeScript({
      code: 'document.getElementsByTagName("video")[0].removeAttribute("loop");'
    }, function() {
      chrome.browserAction.setIcon({
        path: {
          "16": "icon16.png",
          "48": "icon48.png",
          "128": "icon128.png"
        },
        tabId: currentTabId
      });
      isLooping = false;
    });
  } else {
    chrome.tabs.executeScript({
      code: 'document.getElementsByTagName("video")[0].setAttribute("loop", "true");'
    }, function() {
      chrome.browserAction.setIcon({
        path: {
          "16": "icon-looping.png",
          "48": "icon-looping.png",
          "128": "icon-looping.png"
        },
        tabId: currentTabId
      });
      isLooping = true;
    });
  }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    if (tab.url.includes('youtube.com/watch')) {
      chrome.browserAction.enable(currentTabId);
      currentTabId = activeInfo.tabId;
    } else {
      chrome.browserAction.disable(currentTabId);
      chrome.browserAction.setIcon({
        path: {
          "16": "icon-disabled.png",
          "48": "icon-disabled.png",
          "128": "icon-disabled.png"
        },
        tabId: currentTabId
      });
      currentTabId = null;
    }
  });
});




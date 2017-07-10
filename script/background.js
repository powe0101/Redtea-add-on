chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  chrome.tabs.executeScript(null, { file: "script/jquery-3.2.1.js" }, function() {
    //chrome.tabs.executeScript(null, { file: "notification.js" });
  });
});

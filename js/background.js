chrome.browserAction.onClicked.addListener(function(cb){
  if(!localStorage.is_login){
    chrome.browserAction.setPopup({popup: "popup.html"});
  }
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {action: "open_dialog_box", tab_url: tabs[0].url, user: {token: localStorage.token, id: localStorage.user_id, is_login: localStorage.is_login, email: localStorage.email}}, function(response) {

    });
  });
});

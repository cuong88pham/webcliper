chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if(msg.action == 'open_dialog_box'){
    var url = msg.tab_url;
    $.post('http://localhost:3000/api/v1/feeds', {url: url}, function(data){

        $('body').prepend('<p id="page_saved"><b>Page Saved</b></p>');

    });
  }
});

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if(msg.action == 'open_dialog_box'){
    var url = msg.tab_url;
    var a = document.createElement('a');
    a.href = url;
    var token = msg.user.token;
    var html_content = document.getElementsByTagName('html')[0].innerHTML;
    html_content = html_content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").trim();
    var image_url = $('img')[0].src;
    var data = {title: $('html').find('title').text(),
                description: $("meta[name='description']").attr('content'),
                url: url,
                domain: a.hostname,
                image: image_url,
                content: html_content
              };
    $.ajax({
      url: 'http://localhost:3000/api/v1/feeds',
      type: 'post',
      data: data,
      headers: {
          Authorization: token
      },
      success: function (data) {
        if(!data.error){
          $('body').prepend('<p id="page_saved" style="background:#21262C;color:#fff; position:fixed;right:10px; padding:10px;top:50px;z-index:999999999"><b>Page Saved</b></p>');
        }else{
          console.log(data);
        }
      }
    });
  }
});

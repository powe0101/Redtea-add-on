
//alert(jQuery.type($("#mn_count").load('http://redtea.kr/pb/member_notice.php .unread .ellipsis').html()));
function readMe()
{
  //http://redtea.kr/pb/member_notice.php
  "javascript:readReply(2923670,'/pb/pb.php?id=involve&no=239#0'); void 0";
}

function notifyMe() {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('자동알림', {
      icon: 'http://redtea.kr/img/apple_icon.png',
      body: "잠깐만요. 자동알림이 들어왔어요!",
    });

    notification.onclick = function () {
      chrome.tabs.create("http://redtea.kr/pb/member_notice.php", readMe);
    };

  }
}

//alert(jQuery.type($("#mn_count").load('http://redtea.kr/pb/member_notice.php .unread .ellipsis').html()));
//http://redtea.kr/pb/member_notice.php

/*
  알림 노티
  notification_interval : 알림 표시 주기 초기값 60초
  isUnread : $unread in $ellipsis - unread 클래스 가 있으면 ellipsis 클래스 찾아서 체크
  logo_img_url : 확장 프로그램 내 이미지
  notification : 알림 표시 객체 // defricated on August, In that case i had to change this instance.
*/
var notification_interval = 60000;

function notifyMe(_mainLeft) {

  var parse = document.getElementById("parseNotice");
  if(parse)
    parse.remove();

  var x = document.createElement("div");
  x.setAttribute("type","hidden");
  x.setAttribute("id","parseNotice");
  x.setAttribute("style","visibility:hidden;");
  document.getElementsByClassName('logged')[0].appendChild(x);

  //var isUnread = $("#parseNotice").load('http://redtea.kr/pb/member_notice.php .unread .ellipsis').text();
  
  var logo_img_url = chrome.runtime.getURL("icon.png");

  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else if(document.getElementsByClassName("ellipsis")) {
    var notification = new Notification('알림', {
      icon: logo_img_url,
      body: "잠깐만요. 알림이 들어왔어요!"
    });

    notification.onclick = function () {
      window.open("http://redtea.kr/pb/member_notice.php");
    };
  }
}

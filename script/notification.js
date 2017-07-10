/*
  알림 노티
  notification_interval : 알림 표시 주기 초기값 60초
  isUnread : $unread in $ellipsis - unread 클래스 가 있으면 ellipsis 클래스 찾아서 체크
  logo_img_url : 확장 프로그램 내 이미지
  notification : 알림 표시 객체 // defricated on August, In that case i had to change this instance.
  //alert(jQuery.type($("#mn_count").load('http://redtea.kr/pb/member_notice.php .unread .ellipsis').html()));
  //http://redtea.kr/pb/member_notice.php
*/
var notification_interval = 60000; //60초
var isShowContent = true;
var logo_img_url = chrome.runtime.getURL("icon.png");

function deleteNotifyDiv()
{
  var parse = document.getElementById("parseNotice");
  if(parse)
    parse.remove();
}

function makeNotifyDiv()
{
  var x = document.createElement("div");
  x.setAttribute("type","hidden");
  x.setAttribute("id","parseNotice");
  x.setAttribute("style","visibility:hidden;");
  document.getElementsByClassName('slogan')[0].appendChild(x);
}

function notificationing(title,message)
{
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else
  {
    var notification = new Notification(title, {
      icon: logo_img_url,
      body: message
    });

    notification.onclick = function () {
      window.open("http://redtea.kr/pb/member_notice.php");
    };
  }
}

function notifyMe(_mainLeft)
{
  deleteNotifyDiv();
  makeNotifyDiv();

  $("#parseNotice").load('http://redtea.kr/pb/member_notice.php .unread .ellipsis',function(responseTxt, statusTxt, xhr){
        if(statusTxt == "success"){
            if(document.getElementById("parseNotice").hasChildNodes()){
              notificationing('알림',"잠깐만요. 알림을 확인해 주세요!");
            }
            else {
              //alert("읽지 않음 알림 없음");
            }
          }
        if(statusTxt == "error")
            alert("Error: " + xhr.status + ": " + xhr.statusText);
  });

  //notificationing('알림',"잠깐만요. 알림이 들어왔어요!")
  //member_notice 의 읽지 않은 알림 가져오기
}

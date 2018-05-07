//Copyright By G(gongji007@gmail.com)
//최초 작성일 : 2017-05-27

main();//익스텐션 진입점.

/*
  익스텐션 진입점
  searchForm : @d2 - 검색창의 폼 섹션 요소
  myNickName : $r_reporter - 닉네임 input
  mainLeft : @logged - 로그인 폼 요소
*/
function main()
{
  var searchForm = document.getElementsByClassName('d2');
  var myNickName = document.getElementById('r_reporter').value;
  var mainLeft = document.getElementsByClassName('logged');

  if(searchForm[0] && myNickName && searchForm)
    AddSearchByMyIdButton(searchForm,mainLeft,myNickName);

  if(myNickName)
  {
    PrintMyNickNameAtMain(mainLeft,myNickName);
    HighlightMyNickName(myNickName);
    AutoOpenMore();
    AlertDoingWrite();
  }

  articleAreaFontSetting();

  $(document).ready(function() {
    setInterval(notifyMe, notification_interval);
  });

  chrome.storage.sync.get({
    isBlossom: true
  }, function(items) {
    if(items.isBlossom == false)
    var blossomStopButton = document.getElementById("stopBlossom");
    blossomStopButton.click();
  });

}

/*
  티타임용 글씨 확대 축소 기능
  moreList : @tl-name - 타임라인형 더보기 태그
  x : #span - 더보기 태그의 첫번째 자식 태그
*/
function articleAreaFontSetting()
{
  var articleTopArea = document.getElementsByClassName("topbtns");

  if(articleTopArea.length > 0)
    appendBoardFontButtons(articleTopArea);

}

function appendBoardFontButtons(_articleArea)
{
  var x = document.createElement("input");
  x.setAttribute("id","fontSizeUp");
  x.setAttribute("type","button");
  x.setAttribute("value","+");
  x.setAttribute("onclick","");

  _articleArea[0].appendChild(x);

  var x = document.createElement("input");
  x.setAttribute("id","fontSizeDown");
  x.setAttribute("type","button");
  x.setAttribute("value","-");
  x.setAttribute("onclick","");

  _articleArea[0].appendChild(x);

  $("#fontSizeUp").click(function() {
    $('.articleArea').css("font-size", function() {
             return parseInt($(this).css('font-size')) + 1 + 'px';
         });
 });
 $("#fontSizeDown").click(function() {
   $('.articleArea').css("font-size", function() {
            return parseInt($(this).css('font-size')) - 1 + 'px';
        });
});
}

/*
  타임라인 더보기 버튼 자동 클릭
  moreList : @tl-name - 타임라인형 더보기 태그
  x : #span - 더보기 태그의 첫번째 자식 태그
*/
function AutoOpenMore()
{
  var moreList = document.getElementsByClassName("show-more");

  for(var i = 0; i < moreList.length; ++i)
  {
    var x = moreList[i];
    x.click();
  }
}
function pad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}


/*
  타임라인 로그인 된 닉네임 하이라이트 표시
  nameList : @tl-name - 타임라인형 게시판 닉네임 태그
  x : #span - 닉네임 태그의 첫번째 자식 태그, innerText == 작성자 닉네임
*/
function HighlightMyNickName(_nickName)
{
  var nameList = document.getElementsByClassName("tl-name");

  for(var i = 0; i < nameList.length; ++i)
  {
    var x = nameList[i].children[0];

    if(x.innerText == _nickName)
      x.setAttribute("style","cursor:pointer;color:#FF001E;background-color:#FFF000;");
  }
}

/*
  각 게시판 별 검색창 요소 부분 추가
  sn : 게시물 기준 닉네임 대상 검색
  boardName : $r_board_id - 현재 엑티브된 게시판 정보
  x : @searchByNickName - 닉네임으로 검색 할 수 있는 버튼 추가
*/
function AddSearchByMyIdButton(_searchForm,_mainLeft,_nickName)
{
  var boardName = document.getElementById('r_board_id').value;

  var sn = document.createElement("input");
  sn.setAttribute("type","hidden");
  sn.setAttribute("name","sn");
  sn.setAttribute("value","on");

  document.getElementsByName("search")[0].appendChild(sn);

  var x = document.createElement("input");
  x.setAttribute("id","searchByNickName");
  x.setAttribute("type","button");
  x.setAttribute("value","내 닉네임으로 검색");
  x.setAttribute("onclick","location.href='pb.php?id="+boardName+"&sn1=on&sn=on&ss=off&sc=off&keyword="+_nickName+"';");

  _searchForm[0].appendChild(x);

  var articleTopArea = document.getElementById('articleTop');

  var x = document.createElement("input");
  x.setAttribute("id","searchByNickNameLeft");
  x.setAttribute("type","button");
  x.setAttribute("value","내 닉네임으로 검색");
  x.setAttribute("onclick","location.href='pb.php?id="+boardName+"&sn1=on&sn=on&ss=off&sc=off&keyword="+_nickName+"';");

  articleTopArea.appendChild(x);

  var x = document.createElement("input");
  x.setAttribute("id","searchByNickNameLeft");
  x.setAttribute("type","button");
  x.setAttribute("value","내 닉네임으로 검색");
  x.setAttribute("onclick","location.href='pb.php?id="+boardName+"&sn1=on&sn=on&ss=off&sc=off&keyword="+_nickName+"';");

}

/*
  실제 코드 상 문법 단위 문제가 있을 경우 이 기능이 동작하지 않음
  이후 리모컨 기능으로 대체 예정

  //확장 프로그램 동작 여부 확인
*/

function PrintMyNickNameAtMain(_mainLeft,_nickName)
{
  var x = document.createElement("div");
  x.id = "myId";
  x.innerText = "홍차넷 확장 프로그램 동작중";

  _mainLeft[0].appendChild(x);

  var x = document.createElement("input");
  x.setAttribute("id","stopBlossom");
  x.setAttribute("type","button");
  x.setAttribute("style","display:none");
  x.setAttribute("value","정지");
  x.setAttribute("onclick","javascript:$('body').sakura('stop');");

  _mainLeft[0].appendChild(x);
}

/*
  글 작성시 나가지는걸 방지
  #memo : 게시판형 본문 텍스트박스 감지
  #writeSubject : 게시판형 제목 텍스트박스 감지
  #tl-textarea : 타임라인형 텍스트 박스
  windows.onbeforeunload : askConfirm 이벤트 등록
*/
function AlertDoingWrite()
{
  $("#tl-textarea").change(function(){
    isChange = true;
  })

  $("#memo").change(function(){
    isChange = true;
  })

  $("#writeSubject").change(function(){
    isChange = true;
  })

  $(".voyarea2").change(function(){
    isChange = true;
  })

  $("#voyarea2").change(function(){
    isChange = true;
  })

  window.onbeforeunload = askConfirm;
}

function askConfirm()
{
  if (isChange) {
        //TODO 문자열이 바뀌지 않는 문제가 있음.
        alert($("#textNums").text().length);

        return "Your unsaved data will be lost.";
  }
}
function saveChanges() {
       // Get a value saved in a form.
       var theValue = textarea.value;
       // Check that there's some code there.
       if (!theValue) {
         message('Error: No value specified');
         return;
       }
       // Save it using the Chrome extension storage API.
       chrome.storage.sync.set({'tl-keyword': theValue}, function() {
         // Notify that we saved.
         message('Settings saved');
       });
     }

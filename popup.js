
//Copyright By G(powe0101@naver.com)
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
    AddSearchByMyIdButton(searchForm,myNickName);

  if(myNickName)
  {
    PrintMyNickNameAtMain(mainLeft,myNickName);
    HighlightMyNickName(myNickName);
  }
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
      x.setAttribute("style","cursor:pointer;background-color:#A3CCA3;");
  }
}

/*
  각 게시판 별 검색창 요소 부분 추가
  sn : 게시물 기준 닉네임 대상 검색
  boardName : $r_board_id - 현재 엑티브된 게시판 정보
  x : @searchByNickName - 닉네임으로 검색 할 수 있는 버튼 추가
*/
function AddSearchByMyIdButton(_searchForm,_nickName)
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
  x.setAttribute("onclick","document.getElementsByClassName('searchKeyword')[0].value = r_reporter.value;this.form.submit();return false;");

  _searchForm[0].appendChild(x);
}

/*
  mainLeft 지역 닉네임 표시 기능 ( 디버깅용 )
  실제 코드 상 문법 단위 문제가 있을 경우 이 기능이 동작하지 않음
  이후 리모컨 기능으로 대체 예정

  x : 내 닉네임 표시  div
*/

function PrintMyNickNameAtMain(_mainLeft,_nickName)
{
  var x = document.createElement("div");
  x.id = "myId";
  x.innerText = "내 닉네임 : " + _nickName;


/*
  var searchMyArticle = document.createElement("input");
  searchMyArticle.setAttribute("id","searchMyArticle");
  searchMyArticle.setAttribute("type","button");
  searchMyArticle.setAttribute("value","내가 쓴 글 찾기");
  searchMyArticle.setAttribute("onclick","var nameList = document.getElementsByClassName('tl-name');for(var i = 0; i < nameList.length;++i){var x = nameList[i].children[0];if(x.innerText == '"+_nickName+"'"+"){x.scrollIntoView();        break;}}return false;");

  x.appendChild(searchMyArticle);
  _mainLeft[0].appendChild(x);
*/

}

/*
  글 작성시 나가지는걸 방지
  ( 개발중 )
  memo : 게시판형 텍스트박스 감지
  timeline_memo : 타임라인형 텍스트 박스
*/
function AlertDoingWrite()
{
  var memo = document.getElementById("memo") //게시판형 텍스트 박스
  var timeline_memo = document.getElementById("heightChecker"); //타임라인형 텍스트 박스
  //if(document.getElementById('write').memo.value || timeline_memo.innerText)
  //  if(confirm("작성 중인 글이 있습니다!") == true)
  //    document.form.submit();
}

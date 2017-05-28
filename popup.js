
//Copyright By G(powe0101@naver.com)
//최초 작성일 : 2017-05-27

//익스텐션 진입점.
main();

/*
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
    highlightMyNickName(myNickName);
  }
}

/*
  nameList : @tl-name - 타임라인형 게시판 닉네임 태그
  x : #span - 닉네임 태그의 첫번째 자식 태그, innerText == 작성자 닉네임
*/
function highlightMyNickName(_nickName)
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
*/

function PrintMyNickNameAtMain(_mainLeft,_nickName)
{
  var x = document.createElement("div");
  x.className = "myId";
  x.innerText = "내 닉네임 : " + _nickName;
  _mainLeft[0].appendChild(x);

  x = document.createElement("input");
  x.setAttribute("id","searchMyArticle");
  x.setAttribute("type","button");
  x.setAttribute("value","내가 쓴 글 찾기");
  x.setAttribute("onclick","var nameList = document.getElementsByClassName('tl-name');for(var i = 0; i < nameList.length;++i){var x = nameList[i].children[0];if(x.innerText == '"+_nickName+"'"+"){x.scrollIntoView();        break;}}return false;");

  _mainLeft[0].appendChild(x);
}

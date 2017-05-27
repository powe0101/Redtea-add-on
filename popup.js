
//Copyright By G(powe0101@naver.com)
//최초 작성일 : 2017-05-27

//익스텐션 진입점.
main();

/*
  searchForm : 검색창의 폼 섹션 요소 (인덱스 연산)[0]~
  myNickName : @r_reporter : 닉네임 input
  mainLeft : 로그인 폼 요소
*/
function main()
{
  var searchForm = document.getElementsByClassName('d2');
  var myNickName = document.getElementById('r_reporter').value;
  var mainLeft = document.getElementsByClassName('logged');

  if(searchForm[0] && myNickName && searchForm)
    AddSearchByMyIdButton(searchForm,myNickName);

  if(myNickName)
    PrintMyNickNameAtMain(mainLeft,myNickName);
}

/*
  각 게시판 별 검색창 요소 부분 추가
  sn : 게시물 기준 닉네임 대상 검색
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
  실제 코드 상 문제가 있을 경우 이 기능이 동작하지 않음
*/
function PrintMyNickNameAtMain(_mainLeft,_nickName)
{
  var x = document.createElement("div");
  x.className = "myId";
  x.innerText = "내 닉네임 : " + _nickName;
  _mainLeft[0].appendChild(x);
}

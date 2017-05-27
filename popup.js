
//Copyright By G(powe0101@naver.com)
//최초 작성일 : 2017-05-27

main();

function main()
{
  var searchForm = document.getElementsByClassName('d2');
  var myNickName = document.getElementById('r_reporter').value;
  var mainLeft = document.getElementById('mainLeft');

  if(searchForm[0] && myNickName)
    AddSearchByMyIdButton(searchForm,myNickName);

  if(myNickName)
    PrintMyNickNameAtMain(mainLeft,myNickName);
}

function AddSearchByMyIdButton(_searchForm,_nickName)
{
  var boardName = document.getElementById('r_board_id').value;
  var x = document.createElement("input");

  x.setAttribute("type","button");
  x.setAttribute("value","내 닉네임으로 검색");
  _searchForm[0].appendChild(x);

}

function PrintMyNickNameAtMain(_mainLeft,_nickName)
{
  var x = document.createElement("div");
  x.className = "myId";
  x.innerText = "내 닉네임 : " + _nickName;
  _mainLeft.appendChild(x);
}

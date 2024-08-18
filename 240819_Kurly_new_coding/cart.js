// 모달

document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("loginModal");
  var btn = document.querySelector(".order-btn");
  var span = document.getElementsByClassName("close")[0];

  // 모달 열기
  btn.onclick = function () {
    modal.style.display = "block";
  };

  // 모달 닫기
  span.onclick = function () {
    modal.style.display = "none";
  };

  // 모달 외부 클릭 시 닫기
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});

// 수량 버튼 js

function fnCalCount(type, ths) {
  var $input = $(ths).parents("td").find("input[name='pop_out']");
  var tCount = Number($input.val());
  var tEqCount = Number($(ths).parents("tr").find("td.bseq_ea").html());

  if (type == "p") {
    if (tCount < tEqCount) $input.val(Number(tCount) + 1);
  } else {
    if (tCount > 0) $input.val(Number(tCount) - 1);
  }
}

// 수량 버튼 js

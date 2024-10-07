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

// 주소 검색 Modal
const addressModal = document.getElementById("addressModal");
const addressBtn = document.querySelector(".delivery_search .button");
const addressCloseBtn = addressModal.querySelector(".close");

addressBtn.addEventListener("click", () => {
  addressModal.style.display = "block";
});

addressCloseBtn.addEventListener("click", () => {
  addressModal.style.display = "none";
});

// Close modals when clicking outside of them
window.addEventListener("click", (event) => {
  if (event.target === orderModal) {
    orderModal.style.display = "none";
  }
  if (event.target === addressModal) {
    addressModal.style.display = "none";
  }
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

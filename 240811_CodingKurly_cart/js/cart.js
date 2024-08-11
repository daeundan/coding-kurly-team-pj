document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("loginModal");
  var btn = document.querySelector(".login_btn button");
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

const orderBtn1 = document.querySelector("#order_1");
const orderBtn2 = document.querySelector("#order_2");

if (orderBtn2) {
  orderBtn2.addEventListener("click", function () {
    if (orderBtn1) {
      orderBtn1.classList.add("active");
    }
    this.classList.add("active");
  });
}

if (orderBtn1) {
  orderBtn1.addEventListener("click", function () {
    if (orderBtn2) {
      orderBtn2.classList.remove("active");
    }
    this.classList.add("active");
  });
}

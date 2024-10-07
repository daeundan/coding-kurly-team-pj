//==document declare ===
// modal
const long = document.querySelector("#longModal");
//form
const form = document.querySelector("#login_form");
//user input d
const userId = form.querySelector("#login_id");
const userPass = form.querySelector("#login_password");
//random
const autoN = form.querySelector("#autoN");
const randomNum = Math.floor(Math.random() * 3000 + 1);
const autoActive = document.querySelector(".automatic");
//for submit
const loginBtn = form.querySelector(".login");
//modal
const modalBack = document.querySelector("#blackB");
const modal = document.querySelector("#longModal");

const mobileClose = document.querySelector(".mobileClose");
mobileClose.addEventListener("click", () => {
  window.history.back();
});

//==id value only EN & num==
userId.addEventListener("input", function (text) {
  const idText = userId.value;
  const onlyEnNum = /[^a-zA-Z0-9]/g;
  if (onlyEnNum.test(idText)) {
    document.querySelector(".errorId").innerText =
      "영문(대소문자)과 숫자만 입력해주세요.";
  } else {
    document.querySelector(".errorId").innerText = "";
  }
});

const id = "test";
const password = "1234";

//==modal close==
function modalClose() {
  document.querySelectorAll(".close, #blackB").forEach((item) => {
    item.addEventListener("click", () => {
      if (modal.querySelector("h1").innerText.includes("환영합니다")) {
        modalBack.classList.remove("active");
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
        window.location.href = "./index.html";
        localStorage.setItem("id", "test");
      } else {
        modalBack.classList.remove("active");
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  });
}
// const auto num check
function autoCheck() {
  if (randomNum == autoN.value) {
    modal.querySelector("h1").innerText = `${id}님 환영합니다`;
    modalBack.classList.add("active");
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    modalClose();
  } else {
    modal.querySelector("h1").innerHTML = `자동방지 숫자를 확인해주세요`;
    document.querySelector(".autonum").innerText = randomNum;
    modalBack.classList.add("active");
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    modalClose();
  }
}

// ==id,password submit & tree long count==
let falseCount = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (userId.value === id && userPass.value === password) {
    if (autoActive.classList.contains("active")) {
      autoCheck();
    } else {
      modal.querySelector("h1").innerText = `${id}님 환영합니다`;
      modalBack.classList.add("active");
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
      modalClose();
    }
  } else {
    falseCount++;
    modalBack.classList.add("active");
    modal.classList.add("active");
    modal.querySelector("h1").innerText = `아이디와 비밀번호를 확인해주세요`;
    document.body.style.overflow = "hidden";
    modalClose();
    if (falseCount >= 3) {
      document.querySelector(".autonum").innerText = randomNum;
      autoActive.classList.add("active");
    }
  }
});

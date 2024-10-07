// form 요소들
const form = document.querySelector("#login_form");
const mainBtn = document.querySelector(".mainBtn");
const userId = document.querySelector("#userId");
const userpw = document.querySelector("#userpw");
const pwCheck = document.querySelector("#pwCheck");
const userName = document.querySelector("#userName");
//
const emailTwo = document.querySelector(".emailTwo");
const userEmail = document.getElementById("userEmail");
const emailselect = document.getElementById("email");
const emailDirectInput = document.getElementById("emailDr");
//
const hiddenS = document.querySelector(".hiddenS");
const directOptionValue = "direct";
const userPhon = document.querySelector("#userPhon");
const userNumCheck = document.querySelector("#userNumCheck");
const checkBtn = document.querySelector(".checkBtn");
const invite = document.querySelector("#invite");
const participationE = document.querySelector("#participationE");
const eventNone = document.querySelector("#eventNone");
const inviteText = document.querySelector("#invite-text");
const checkBoxs = document.querySelectorAll("input[type='checkbox']");
//----------modal-----------------//
const modalBase = document.querySelector(".modalBase");
const modalClose = document.querySelector(".modal_close");
const tap1 = document.querySelector(".tap1");
const tap2 = document.querySelector(".tap2");
const tap3 = document.querySelector(".tap3");
const tapModal1 = document.querySelector(".tapModal1");
const tapModal2 = document.querySelector(".tapModal2");
const tapModal3 = document.querySelector(".tapModal3");
const tapModal4 = document.querySelector(".tapModal4");
const modalText = document.querySelector(".modalText");

//------------------오토 넘버
const numCheckBtn = document.querySelector(".numCheckBtn");
const timeset = document.querySelector(".timeset");
//------------------ 하단 필수 체크
const inputChs = document.querySelectorAll('input[type="checkbox"]');
const termsCheck = document.querySelector("#termsCheck");
const privateCheck = document.querySelector("#privateCheck");
const b14Age = document.querySelector("#A14Age");
//
//------------submit------------
const address = document.querySelector(".address");

const essenBoxs = document.querySelectorAll(".essenBoxs");
const essenAgrees = document.querySelectorAll(".essenAgrees");
const essenBoxs2 = document.querySelectorAll(".essenBoxs2");
const detail = document.getElementById("sample6_detailAddress");
const saAdress = document.getElementById("sample6_address");

const mobileClose = document.querySelector(".mobileClose");
mobileClose.addEventListener("click", () => {
  window.history.back();
});
//--submit check array
let submitList = [];
function checkarrMinus(mainArr, arrayE) {
  if (mainArr.includes(arrayE))
    for (let i = 0; i < mainArr.length; i++) {
      if (mainArr[i] === arrayE) {
        mainArr.splice(i, 1);
        i--;
      }
    }
}

//-----------top -----------------//

////-------------각요소 조건
//id
userId.addEventListener("change", function () {
  const idErr = /^[a-zA-Z0-9]{6,16}$/g;
  const idIn = document.querySelector(".iderr");
  checkarrMinus(submitList, "userId");
  if (userId.value === "") {
    idIn.innerText = "";
    // userId.classList.add("essenBoxs");
    checkarrMinus(submitList, "userId");
  } else if (!idErr.test(userId.value)) {
    idIn.innerText = "6자 이상 16자 이하의 영문과 숫자를 조합만 가능합니다.";
    checkarrMinus(submitList, "userId");
  } else {
    idIn.innerText = "";
    submitList.push("userId");
  }
});

//----pass //
userpw.addEventListener("change", function () {
  const pwErr = /^[a-zA-Z0-9`~!@#$%^&*()-_=+]{10,}$/g;
  const passIn = document.querySelector(".passerr");
  checkarrMinus(submitList, "userpw");
  if (userpw.value === "") {
    passIn.innerText = "";
    checkarrMinus(submitList, "userpw");
  } else if (!pwErr.test(userpw.value)) {
    passIn.innerText = "10자 이상에 영문 숫자 특수문자 조합만 가능합니다.";
    checkarrMinus(submitList, "userpw");
  } else {
    passIn.innerText = "";
    submitList.push("userpw");
  }
});

//----pass2 //pd2Succ
pwCheck.addEventListener("change", function () {
  const pass2In = document.querySelector(".pw2err");
  checkarrMinus(submitList, "pwCheck");
  if (pwCheck.value === "") {
    checkarrMinus(submitList, "pwCheck");
  } else if (pwCheck.value === userpw.value) {
    pass2In.innerText = "";
    submitList.push("pwCheck");
  } else {
    pass2In.innerText = "동일한 비밀번호 입력해주세요.";
    checkarrMinus(submitList, "pwCheck");
  }
});

//----name // userName
userName.addEventListener("change", function () {
  const nameIn = document.querySelector(".nameErr");
  const nameErr = /^[가-힣a-zA-Z]+$/g;
  if (userName.value === "") {
    nameIn.innerText = "";
    checkarrMinus(submitList, "userName");
  } else if (!nameErr.test(userName.value)) {
    nameIn.innerText = "이름을 확인해주세요.";
    checkarrMinus(submitList, "userName");
  } else {
    nameIn.innerText = "";
    submitList.push("userName");
  }
});

//----email//emailSucc = emailS + inputS + selectS ==>2개이상
//emailS domainS

// 직접입력 input Text
hiddenS.addEventListener("input", () => {
  checkarrMinus(submitList, "domainS");
  if (emailDirectInput.value === "") {
    checkarrMinus(submitList, "domainS");
  } else {
    submitList.push("domainS");
  }
});

// select 부분
emailselect.addEventListener("click", function () {
  checkarrMinus(submitList, "domainS");
  if (this.value === "direct") {
    hiddenS.classList.add("active");
    checkarrMinus(submitList, "domainS");
  } else if (this.value === "none") {
    checkarrMinus(submitList, "domainS");
  } else {
    hiddenS.classList.remove("active");
    submitList.push("domainS");
  }
});

//id 입력 input
userEmail.addEventListener("input", function () {
  const emailValue = userEmail.value.trim();
  const userOtherId = [...emailValue.split("@")]; // @기준으로 새 배열만듦
  const onlyId = [...userOtherId].shift(); // 아이디만 가진 배열 = 편의를 위해 뺌
  const atIndex = emailValue.indexOf("@"); // 문자열에서 @의 인덱스 위치
  const emailErr = /^[a-zA-Z0-9/@/.]+$/g;
  const emailIn = document.querySelector(".emailerr");
  checkarrMinus(submitList, "emailS");

  if (emailValue.includes("@") === true) {
    hiddenS.classList.remove("active");
  }
  if (emailValue === "") {
    emailIn.innerText = "";
    checkarrMinus(submitList, "emailS");
  } else if (!emailErr.test(emailValue)) {
    emailIn.innerText = "숫자 또는 영문만 입력 가능합니다.";
    checkarrMinus(submitList, "emailS");
  } else {
    emailIn.innerText = "";
    submitList.push("emailS");
    if (emailDirectInput.value === "" && emailselect.value === "none") {
      checkarrMinus(submitList, "domainS");
    } else {
      submitList.push("domainS");
    }
  }
  //select태그에 들어가는 주소
  if (emailValue.includes("@") === true) {
    const domain = emailValue.substring(atIndex + 1);
    let optionFound = false;
    for (let option of emailselect.options) {
      if (option.value === directOptionValue) {
        continue;
      }
      const optionText = option.textContent || option.innerText;
      if (optionText === domain) {
        emailselect.value = option.value;
        optionFound = true;
        submitList.push("domainS");
        break;
      }
    }
    // 도메인이 일치하는 옵션이 없으면 '직접입력' 옵션 선택
    if (!optionFound) {
      emailselect.value = directOptionValue;
      hiddenS.classList.add("active");
      emailDirectInput.focus();
      emailDirectInput.value = domain;
      if (!hiddenS === "") {
        submitList.push("domainS");
      }
    }
  }
  userEmail.value = null;
  userEmail.value = `${onlyId}`;
});

//----Phon

let clear = false;

userPhon.addEventListener("input", function () {
  const phonIn = document.querySelector(".phonerr");
  const PhonV = userPhon.value;
  const trimPhon = PhonV.replace(/-/g, "");
  checkarrMinus(submitList, "userPhon");
  if (userPhon.value === "") {
    phonIn.innerText = "";
  } else if (!/^[0][0-9]{9,10}$/.test(trimPhon)) {
    phonIn.innerText = "숫자 10~11자리";
  } else {
    phonIn.innerText = "";
    checkBtn.classList.add("active");
    checkBtn.disabled = false;
  }
});

//랜덤 리팩토링 함수영역
const clickNumModal = () => {
  modalBase.addEventListener("click", () => {
    userPhon.disabled = true;
    checkBtn.disabled = true;
    checkBtn.classList.remove("active");
    numCheckBtn.disabled = true;
    numCheckBtn.classList.add("numDisable");
    userNumCheck.disabled = true;
  });
  modalClose.addEventListener("click", () => {
    userPhon.disabled = true;
    checkBtn.disabled = true;
    numCheckBtn.disabled = true;
    userNumCheck.disabled = true;
  });
};

const timer = () => {
  let time = 180;
  interval = setInterval(() => {
    if (clear === true) {
      clearInterval(interval);
      return;
    } else if (clear === false && time >= 0) {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      timeset.innerText = minutes + ":" + String(seconds).padStart(2, "0");
      time -= 1;
    } else {
      modalText.innerText = "시간이 초과되었습니다.";
      modalBase.style.display = "block";
      document.body.style.overflow = "hidden";
      tapModal4.style.display = "block";
      userNumCheck.disabled = true;
      numCheckBtn.disabled = true;
      numCheckBtn.classList.add("numDisable");
      clearInterval(interval);
    }
  }, 1000);
};

const regularphonCheck = () => {
  userNumCheck.addEventListener("input", () => {
    const numcheckErr = /^[0-9]{6}$/;
    const uNCIn = document.querySelector(".uNCInerr");

    if (userNumCheck.value === "") {
      uNCIn.innerText = "";
    } else if (!numcheckErr.test(userNumCheck.value)) {
      uNCIn.innerText = "인증번호는 6자리 숫자입니다.";
    } else {
      uNCIn.innerText = "";
    }
  });
};

// 실제 실행되는 메인 함수
checkBtn.addEventListener("click", () => {
  const randomNum = String(Math.floor(Math.random() * 100000)).padStart(6, "0");
  alert(`인증번호는 ${randomNum}입니다.`);

  const phoneCheck = document.querySelector(".phoneCheck");
  phoneCheck.style.display = "flex";
  userNumCheck.disabled = false;
  numCheckBtn.disabled = false;
  numCheckBtn.classList.remove("numDisable");
  timer();
  regularphonCheck();
  checkarrMinus(submitList, "userPhon");
  checkarrMinus(submitList, "userNumCheck");
  numCheckBtn.addEventListener("click", () => {
    if (userNumCheck.value === randomNum) {
      modalText.innerText = "인증완료";
      modalBase.style.display = "block";
      document.body.style.overflow = "hidden";
      tapModal4.style.display = "block";
      userPhon.classList.remove("essenBoxs");
      userNumCheck.classList.remove("essenBoxs");
      clear = true;
      submitList.push("userPhon");
      timer();
      clickNumModal();
    } else {
      modalText.innerText = "인증실패";
      modalBase.style.display = "block";
      document.body.style.overflow = "hidden";
      tapModal4.style.display = "block";
      userPhon.classList.add("essenBoxs");
      userNumCheck.classList.add("essenBoxs");
    }
  });
});

//----adress
//실행문
function sample6_execDaumPostcode() {
  checkarrMinus(submitList, "address");

  new daum.Postcode({
    theme: {
      searchBgColor: "#5F0080",
      queryTextColor: "#FFFFFF",
      emphTextColor: "#5F0080",
    },
    oncomplete: function (data) {
      document.querySelector(".addressInner").classList.add("active");
      var addr = "";
      var extraAddr = "";

      if (data.userSelectedType === "R") {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === "R") {
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
        document.getElementById("sample6_extraAddress").value = extraAddr;
      } else {
        document.getElementById("sample6_extraAddress").value = "";
      }

      document.getElementById("sample6_address").value = addr;
      document.getElementById("sample6_detailAddress").focus();
    },
  }).open();
  detail.addEventListener("change", () => {
    checkarrMinus(submitList, "address");
    submitList.push("address");
    checkarrMinus(submitList, "address2");
    checkarrMinus(submitList, "address3");
    if (detail.value === "") {
      checkarrMinus(submitList, "address2");
    } else {
      submitList.push("address2");
    }
    if (saAdress.value === "") {
      checkarrMinus(submitList, "address3");
    } else {
      submitList.push("address3");
    }
  });
  saAdress.addEventListener("change", () => {
    checkarrMinus(submitList, "address");
    submitList.push("address");
    checkarrMinus(submitList, "address2");
    checkarrMinus(submitList, "address3");
    if (detail.value === "") {
      checkarrMinus(submitList, "address2");
    } else {
      submitList.push("address2");
    }
    if (saAdress.value === "") {
      checkarrMinus(submitList, "address3");
    } else {
      submitList.push("address3");
    }
  });
}

//----birth

const changebirth1 = () => {
  const birth1 = document.querySelector("#year").value;
  if (birth1.length === 4) {
    document.querySelector("#moth").focus();
  }
};

const changebirth2 = () => {
  const birth2 = document.querySelector("#moth").value;
  if (birth2.length === 2) {
    document.querySelector("#day").focus();
  }
};

const changebirth3 = () => {
  const birth1 = document.querySelector("#year").value;
  const birth2 = document.querySelector("#moth").value;
  const birth3 = document.querySelector("#day").value;
  const birthIn = document.querySelector(".birtherr");
  if (birth3.length === 2) {
    document.querySelector("#day").blur();
  } else if (
    /^[0-9]+$/g.test(birth1) &&
    /^[0-9]+$/g.test(birth2) &&
    /^[0-9]+$/g.test(birth3)
  ) {
    birthIn.innerText = "";
  } else {
    birthIn.innerText = "숫자만 입력해주세요.";
  }
};

//----invit

invite.addEventListener("change", () => {
  document.querySelector(".hidden-add").classList.add("active");
});
participationE.addEventListener("change", () => {
  document.querySelector(".hidden-add").classList.add("active");
});
eventNone.addEventListener("change", () => {
  document.querySelector(".hidden-add").classList.remove("active");
});

inviteText.addEventListener("keyup", () => {
  if (inviteText.value === "") {
    document.querySelector(".IdEvftn").classList.remove("active");
  } else {
    document.querySelector(".IdEvftn").classList.add("active");
  }
});

//--------bottom checkbox --------//

//**-------모달--------**/

tap1.addEventListener("click", () => {
  const frame = document.querySelector(".frame");
  modalBase.style.display = "block";
  document.body.style.overflow = "hidden";
  tapModal1.style.display = "block";
  frame.style.overflowY = "scroll";
});

tap2.addEventListener("click", () => {
  modalBase.style.display = "block";
  document.body.style.overflow = "hidden";
  tapModal2.style.display = "block";
});

tap3.addEventListener("click", () => {
  modalBase.style.display = "block";
  document.body.style.overflow = "hidden";
  tapModal3.style.display = "block";
});

modalBase.addEventListener("click", () => {
  modalBase.style.display = "none";
  document.body.style.overflow = "auto";
  tapModal1.style.display = "none";
  tapModal2.style.display = "none";
  tapModal3.style.display = "none";
});

modalClose.addEventListener("click", () => {
  modalBase.style.display = "none";
  document.body.style.overflow = "auto";
  tapModal1.style.display = "none";
  tapModal2.style.display = "none";
  tapModal3.style.display = "none";
});
// **  --체크박스와 아이콘 연동 함수-- **//

function checkAndIcon(checkBox) {
  let checkIcon = document.getElementsByClassName(`${checkBox.id}`)[0];
  const allCheck = document.querySelector(".allCheck");
  const allCheckBox = document.querySelector("#allCheck");
  if (checkBox.checked) {
    checkIcon.classList.add("active");
  } else {
    checkIcon.classList.remove("active");
  }

  allCheckBox.checked === true
    ? allCheck.classList.add("active")
    : allCheck.classList.remove("active");
}

//** --전체체크 이벤트 --**//

function checkAll(all, element) {
  let allCheck = document.querySelector(all);
  let checkElements = document.querySelectorAll(element);
  let it_check = allCheck.checked;

  checkElements.forEach((checkElement) => {
    if (checkElement.disabled !== true) {
      checkElement.checked = it_check;
      checkAndIcon(checkElement);
    }
  });
}

//개별요소 선택시
function checkToggle(all, element) {
  const allCheck = document.querySelector(all);
  //체크가능한 전체 요소들 개수
  let checkBox_in = document.querySelectorAll(element + ":enabled").length;
  //체크된 요소의 개수
  let allchecked = document.querySelectorAll(
    element + ":checked:enabled"
  ).length;
  if (checkBox_in === allchecked) {
    allCheck.checked = true;
  } else {
    allCheck.checked = false;
  }
  checkAndIcon(allCheck);
}

// 핸들러
function checkHandler(all, element) {
  const allCheck = document.querySelector(all);
  const checkElements = document.querySelectorAll(element);
  allCheck.addEventListener("change", () => {
    //전체체크 선택시
    checkAll(all, element);
  });
  checkElements.forEach((checkElement) => {
    checkElement.addEventListener("change", () => {
      //개별요소 선택시
      checkToggle(all, element);
      checkAndIcon(checkElement);
    });
  });
}

//--------submit-------------------//

//컬러 개별
const style = (Elet) => {
  Elet.style.backgroundColor = "#f9c9d4";
};
const styleNone = (Elet) => {
  Elet.style.backgroundColor = "";
};

//컬러 종합- 배열 확인 후 컬러 넣기
const subColor = (elementN, variN) => {
  if (submitList.includes(elementN)) {
    styleNone(variN);
  } else {
    style(variN);
  }
};

// 복수확인 input이 포함된 최종 확인 함수
const redalert = function () {
  subColor("userId", userId);
  subColor("userpw", userpw);
  subColor("pwCheck", pwCheck);
  subColor("userName", userName);

  if (submitList.includes("domainS") && submitList.includes("emailS")) {
    styleNone(emailTwo);
    styleNone(userEmail);
    styleNone(emailselect);
    styleNone(emailDirectInput);
  } else {
    style(emailTwo);
    style(userEmail);
    style(emailselect);
    style(emailDirectInput);
  }
  if (submitList.includes("userPhon")) {
    styleNone(userPhon);
    styleNone(userNumCheck);
  } else {
    style(userPhon);
    style(userNumCheck);
  }
  if (
    submitList.includes("address") &&
    submitList.includes("address2") &&
    submitList.includes("address3")
  ) {
    styleNone(address);
    styleNone(detail);
    styleNone(saAdress);
  } else {
    style(address);
    style(detail);
    style(saAdress);
  }
  //bottom
  if (submitList.includes("termsCheck")) {
    document.querySelector(".termsCheckText").style.color = "#727272";
    document.querySelector(".termsCheckText2").style.color = "#727272";
  } else {
    document.querySelector(".termsCheckText").style.color = "#ef7793";
    document.querySelector(".termsCheckText2").style.color = "#ef7793";
  }
  if (submitList.includes("privateCheck")) {
    document.querySelector(".privateCheckText").style.color = "#727272";
    document.querySelector(".privateCheckText2").style.color = "#727272";
  } else {
    document.querySelector(".privateCheckText").style.color = "#ef7793";
    document.querySelector(".privateCheckText2").style.color = "#ef7793";
  }
  if (submitList.includes("b14Age")) {
    document.querySelector(".A14AgeText").style.color = "#727272";
    document.querySelector(".A14AgeText2").style.color = "#727272";
  } else {
    document.querySelector(".A14AgeText").style.color = "#ef7793";
    document.querySelector(".A14AgeText2").style.color = "#ef7793";
  }

  // if (submitList.includes("termsCheck")) {
  //   document.querySelector(".termsCheckText").style.color = "#727272";
  // } else {
  //   document.querySelector(".A14AgeText").style.color = "rgb(114, 114, 114)";
  // }
};

//체크 확인함수
const checkAlready = (element) => {
  if (submitList.includes(element)) {
    return;
  } else {
    submitList.push(element);
  }
};
const checkNone = (element) => {
  const i = submitList.indexOf(element);

  if (0 <= i) {
    submitList.splice(i, 1);
  }
};

//가입하기버튼 이벤트
mainBtn.addEventListener("click", (e) => {
  termsCheck.checked === true
    ? checkAlready("termsCheck")
    : checkNone("termsCheck");

  privateCheck.checked === true
    ? checkAlready("privateCheck")
    : checkNone("privateCheck");

  b14Age.checked === true ? checkAlready("b14Age") : checkNone("b14Age");
  e.preventDefault();
  redalert();

  if (submitList.length === 13) {
    modalText.innerText = "환영합니다.";
    modalBase.style.display = "block";
    document.body.style.overflow = "hidden";
    tapModal4.style.display = "block";
    modalBase.addEventListener("click", () => {
      modalBase.style.display = "none";
      document.body.style.overflow = "auto";
      tapModal4.style.display = "none";
      window.location.href = "./index.html";
    });
    document.querySelector(".closeBtn").addEventListener("click", () => {
      modalBase.style.display = "none";
      document.body.style.overflow = "auto";
      tapModal4.style.display = "none";
      window.location.href = "./index.html";
    });
  } else {
    modalText.innerText = "필수요소를 확인해주세요.";
    modalBase.style.display = "block";
    document.body.style.overflow = "hidden";
    tapModal4.style.display = "block";
    modalBase.addEventListener("click", () => {
      modalBase.style.display = "none";
      document.body.style.overflow = "auto";
      tapModal4.style.display = "none";
    });
    document.querySelector(".closeBtn").addEventListener("click", () => {
      modalBase.style.display = "none";
      document.body.style.overflow = "auto";
      tapModal4.style.display = "none";
    });
  }
});

//-----------
checkHandler(".subAll", ".subElement");
checkHandler(".allCheckBox", ".checkElement");

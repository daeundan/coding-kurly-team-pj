// main slide
const mainBanner = document.querySelector("#main_banner");
const mainSlideArrowLeft = document.querySelector(".main_banner_btn.left");
const mainSlideArrowRight = document.querySelector(".main_banner_btn.right");
const mainSlideImgPC = document.querySelector(".bg_imgPC");
const mainSlideImgMO = document.querySelector(".bg_imgMO");
const mainCounterNow = document.querySelector(".now_counter");
const mainCounterAll = document.querySelector(".all_counter");
const mainWidth = 1050;

const mainPicsPC = [
  "main_01.png",
  "main_02.jpg",
  "main_03.jpg",
  "main_04.jpg",
  "main_05.jpg",
  "main_06.jpg",
  "main_07.jpg",
  "main_08.jpg",
  "main_09.png",
  "main_10.jpg",
];

const mainPicsMO = [
  "main_01.png",
  "main_02.jpg",
  "main_03.png",
  "main_04.jpg",
  "main_05.jpg",
  "main_06.jpg",
  "main_07.jpg",
  "main_08.png",
  "main_09.jpg",
  "main_10.jpg",
];

let slide = 0;
let currentIdx = 0;

// mainSlideImg.style.backgroundImage = `url(../img/main/${mainPicsPC[i]})`;

mainCounterAll.innerText = mainPicsPC.length;
// console.log(mainPicsPC.length);
mainCounterNow.innerText = currentIdx + 1;

// 이미지 세팅
for (let i = 0; i < mainPicsPC.length; i++) {
  const img = document.createElement("img");
  const src = document.createAttribute("src");

  src.value = `../img/main/${mainPicsPC[i]}`;
  img.setAttributeNode(src);
  mainSlideImgPC.appendChild(img);
}

for (let i = 0; i < mainPicsMO.length; i++) {
  const img = document.createElement("img");
  const src = document.createAttribute("src");

  src.value = `../img/main/m/${mainPicsMO[i]}`;
  img.setAttributeNode(src);
  mainSlideImgMO.appendChild(img);
}

//width 계산
const updateWidth = () => {
  const imgs = document.querySelectorAll(".bg_imgPC > img");
  const imgsM = document.querySelectorAll(".bg_imgMO > img");
  const newSlideCount = imgs.length;
  const newSlideCountM = imgsM.length;
  const imgWidth = 100;
  const newWidth = `${newSlideCount * imgWidth}%`;
  const newWidthM = `${newSlideCountM * imgWidth}%`;
  mainSlideImgPC.style.width = newWidth;
  mainSlideImgMO.style.width = newWidth;
};

const setInitialPos = () => {
  mainSlideImgPC.style.transform = `translateX(-33.33%)`;
  mainSlideImgMO.style.transform = `translateX(-33.33%)`;
};

//이미지 클론
const imgs = document.querySelectorAll(".bg_imgPC > img");
const imgsM = document.querySelectorAll(".bg_imgMO > img");
const makeClone = () => {
  for (let i = 0; i < imgs.length; i++) {
    const cloneSlide = imgs[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    mainSlideImgPC.appendChild(cloneSlide);
  }
  for (let i = imgs.length - 1; i >= 0; i--) {
    const cloneSlide = imgs[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    mainSlideImgPC.prepend(cloneSlide);
  }
  for (let i = 0; i < imgsM.length; i++) {
    const cloneSlideM = imgsM[i].cloneNode(true);
    cloneSlideM.classList.add("clone");
    mainSlideImgMO.appendChild(cloneSlideM);
  }
  for (let i = imgsM.length - 1; i >= 0; i--) {
    const cloneSlideM = imgsM[i].cloneNode(true);
    cloneSlideM.classList.add("clone");
    mainSlideImgMO.prepend(cloneSlideM);
  }
  updateWidth();
  setInitialPos();
  setTimeout(() => {
    mainSlideImgPC.classList.add("animated");
  }, 100);
  setTimeout(() => {
    mainSlideImgMO.classList.add("animated");
  }, 100);
};

makeClone();

// 슬라이드 이동 함수
const moveSlide = (num) => {
  slide = num;
  mainSlideImgPC.style.left = `${num}00%`;
  mainSlideImgMO.style.left = `${num}00%`;
  if (slide === mainPicsPC.length || slide === -mainPicsPC.length) {
    setTimeout(() => {
      mainSlideImgPC.classList.remove("animated");
      mainSlideImgPC.style.left = "0px";
      slide = 0;
    }, 500);
    setTimeout(() => {
      mainSlideImgPC.classList.add("animated");
    }, 600);
  }
  if (slide === mainPicsMO.length || slide === -mainPicsMO.length) {
    setTimeout(() => {
      mainSlideImgMO.classList.remove("animated");
      mainSlideImgMO.style.left = "0px";
      slide = 0;
    }, 500);
    setTimeout(() => {
      mainSlideImgMO.classList.add("animated");
    }, 600);
  }
};

// 슬라이드 카운트 업데이트 (감소)
const counterUpdateMinus = () => {
  if (currentIdx < 1) {
    currentIdx = mainPicsPC.length - 1;
  } else {
    currentIdx--;
  }
  mainCounterNow.innerText = currentIdx + 1;
};

// 슬라이드 카운트 업데이트 (증가)
const counterUpdatePlus = () => {
  if (currentIdx < mainPicsPC.length - 1) {
    currentIdx++;
  } else {
    currentIdx = 0;
  }
  mainCounterNow.innerText = currentIdx + 1;
};

// 버튼 클릭으로 슬라이드 이동 (PC)
mainSlideArrowLeft.addEventListener("click", () => {
  moveSlide(slide + 1);
  counterUpdateMinus();
});

mainSlideArrowRight.addEventListener("click", () => {
  moveSlide(slide - 1);
  counterUpdatePlus();
});

// 슬라이드로 슬라이드 이동 (MO)
let startPoint = 0;
let endPoint = 0;

mainBanner.addEventListener("mousedown", (e) => {
  startPoint = e.pageX; // 터치가 시작되는 위치 저장
});
mainBanner.addEventListener("mouseup", (e) => {
  endPoint = e.pageX; // 터치가 끝나는 위치 저장
  if (startPoint < endPoint) {
    moveSlide(slide + 1);
    counterUpdateMinus();
  } else if (startPoint > endPoint) {
    moveSlide(slide - 1);
    counterUpdatePlus();
  }
});

mainBanner.addEventListener("touchstart", (e) => {
  startPoint = e.touches[0].pageX; // 터치가 시작되는 위치 저장
});
mainBanner.addEventListener("touchend", (e) => {
  endPoint = e.changedTouches[0].pageX; // 터치가 끝나는 위치 저장
  if (startPoint < endPoint) {
    moveSlide(slide + 1);
    counterUpdateMinus();
  } else if (startPoint > endPoint) {
    moveSlide(slide - 1);
    counterUpdatePlus();
  }
});

// 자동슬라이드 및 정지
let timer = undefined;
const autoSlide = () => {
  if (timer === undefined) {
    timer = setInterval(() => {
      moveSlide(slide - 1);
      counterUpdatePlus();
    }, 3000);
  }
};

autoSlide();

const stopSlide = () => {
  clearInterval(timer);
  timer = undefined;
};

mainBanner.addEventListener("mouseenter", () => {
  stopSlide();
});

mainBanner.addEventListener("mouseleave", () => {
  autoSlide();
});

mainSlideArrowLeft.addEventListener("mouseenter", () => {
  stopSlide();
});

mainSlideArrowLeft.addEventListener("mouseleave", () => {
  autoSlide();
});

mainSlideArrowRight.addEventListener("mouseenter", () => {
  stopSlide();
});

mainSlideArrowRight.addEventListener("mouseleave", () => {
  autoSlide();
});

// 카테고리 위치 이동(MO)
const categoryArea = document.querySelector("#category_area");
const categoryItems = document.querySelector(".category_items");
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let slideWidth = categoryItems.clientWidth - 25; // 슬라이더 컨테이너의 너비
let maxTranslate = -(categoryItems.scrollWidth - slideWidth); // 슬라이더가 이동할 수 있는 최대 값 (왼쪽 끝)

// 이벤트 핸들러 함수 정의
const touchStart = (event) => {
  isDragging = true;
  startPos = getPositionX(event);
  animationID = requestAnimationFrame(animation);
  categoryItems.classList.add("grabbing");
};

const touchMove = (event) => {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
};

const touchEnd = () => {
  isDragging = false;
  cancelAnimationFrame(animationID);

  // 스냅 동작
  snapToClosestSlide();

  categoryItems.classList.remove("grabbing");
};

const getPositionX = (event) => {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
};

const animation = () => {
  categoryItems.style.transform = `translateX(${currentTranslate}px)`;
  if (isDragging) requestAnimationFrame(animation);
};

const snapToClosestSlide = () => {
  const threshold = slideWidth / 4; // 4분의 1이 넘어가면 스냅하도록 설정
  if (currentTranslate - prevTranslate < -threshold) {
    currentTranslate = Math.floor(currentTranslate / slideWidth) * slideWidth;
  } else if (currentTranslate - prevTranslate > threshold) {
    currentTranslate = Math.ceil(currentTranslate / slideWidth) * slideWidth;
  } else {
    currentTranslate = Math.round(prevTranslate / slideWidth) * slideWidth;
  }
  setPositionByIndex();
};

const setPositionByIndex = () => {
  currentTranslate = Math.max(Math.min(currentTranslate, 0), maxTranslate);
  categoryItems.style.transform = `translateX(${currentTranslate}px)`;
  prevTranslate = currentTranslate; // 스냅 이후에도 currentTranslate 값을 기억
};

const addCategoryMoveEvents = () => {
  categoryArea.addEventListener("touchstart", touchStart);
  categoryArea.addEventListener("touchmove", touchMove);
  categoryArea.addEventListener("touchend", touchEnd);
  categoryArea.addEventListener("mousedown", touchStart);
  categoryArea.addEventListener("mousemove", touchMove);
  categoryArea.addEventListener("mouseup", touchEnd);
  categoryArea.addEventListener("mouseleave", () => {
    if (isDragging) touchEnd();
  });
};

const removeCategoryMoveEvents = () => {
  categoryArea.removeEventListener("touchstart", touchStart);
  categoryArea.removeEventListener("touchmove", touchMove);
  categoryArea.removeEventListener("touchend", touchEnd);
  categoryArea.removeEventListener("mousedown", touchStart);
  categoryArea.removeEventListener("mousemove", touchMove);
  categoryArea.removeEventListener("mouseup", touchEnd);
  categoryItems.style.transform = "translateX(0px)"; // 초기화
};

// 초기 실행 시 설정
window.addEventListener("resize", () => {
  if (window.innerWidth < 1050) {
    addCategoryMoveEvents();
  } else {
    removeCategoryMoveEvents();
  }
});

// 초기 페이지 로드 시 화면 크기에 맞게 설정
if (window.innerWidth < 1050) {
  addCategoryMoveEvents();
} else {
  removeCategoryMoveEvents();
}

//라이브 영역
// 라이브 하트 버튼
const heartBtn = document.querySelectorAll(".heart_icon");

heartBtn.forEach((e) => {
  e.addEventListener("click", () => {
    e.querySelector("i:nth-child(1)").classList.toggle("active");
    e.querySelector("i:nth-child(2)").classList.toggle("active");
  });
});

// 라이브 마우스오버 비디오 재생 이벤트
const liveItem = document.querySelectorAll(".live_item");

liveItem.forEach((e) => {
  e.querySelector(".live_video > video").play();
  e.addEventListener("mouseover", () => {
    e.querySelector(".live_video > video").pause();
  });
  e.addEventListener("mouseleave", () => {
    e.querySelector(".live_video > video").play();
  });
});

// 라이브/제품 슬라이드
const liveSliceArea = document.querySelector(".live_items");
const liveSlideArrowLeft = document.querySelector("#LIVE_leftArrow");
const liveSlideArrowRight = document.querySelector("#LIVE_rightArrow");
let slideStart = true;
let slideEnd = false;
let c = 0;

const liveMoveSlide = (c) => {
  liveSliceArea.style.transform = `translateX(${-c * 360}px)`;
};

const liveMOEventDecrease = () => {
  if (c > 0) {
    c--;
  } else {
    c = 4;
  }
  liveMoveSlide(c);
};

const liveMOEventIncrease = () => {
  if (c < 4) {
    c++;
  } else {
    c = 0;
  }
  liveMoveSlide(c);
};

const livePCEventDecrease = () => {
  if (slideEnd === true) {
    liveSliceArea.style.transform = `translateX(0)`;
    slideStart = true;
    slideEnd = false;
    liveSlideArrowLeft.style.opacity = "0";
    liveSlideArrowRight.style.opacity = "1";
  }
};

const livePCEventIncrease = () => {
  if (slideStart === true) {
    liveSliceArea.style.transform = `translateX(-${mainWidth}px)`;
    slideEnd = true;
    slideStart = false;
    liveSlideArrowRight.style.opacity = "0";
    liveSlideArrowLeft.style.opacity = "1";
  }
};

window.addEventListener("resize", () => {
  if (window.innerWidth < 1050) {
    c = 0;
    liveSlideArrowLeft.removeEventListener("click", livePCEventDecrease);
    liveSlideArrowRight.removeEventListener("click", livePCEventIncrease);
    liveSliceArea.style.transform = `translateX(0)`;
    liveSlideArrowLeft.style.opacity = "1";
    liveSlideArrowRight.style.opacity = "1";
    liveSlideArrowLeft.addEventListener("click", liveMOEventDecrease);
    liveSlideArrowRight.addEventListener("click", liveMOEventIncrease);
  } else {
    c = 0;
    liveSliceArea.style.transform = `translateX(0)`;
    liveSlideArrowLeft.removeEventListener("click", liveMOEventDecrease);
    liveSlideArrowRight.removeEventListener("click", liveMOEventIncrease);
    liveSlideArrowLeft.addEventListener("click", livePCEventDecrease);
    liveSlideArrowRight.addEventListener("click", livePCEventIncrease);
  }
});

// 초기 페이지 로드 시 화면 크기에 맞게 설정
if (window.innerWidth < 1050) {
  c = 0;
  liveSlideArrowLeft.removeEventListener("click", livePCEventDecrease);
  liveSlideArrowRight.removeEventListener("click", livePCEventIncrease);
  liveSliceArea.style.transform = `translateX(0)`;
  liveSlideArrowLeft.style.opacity = "1";
  liveSlideArrowRight.style.opacity = "1";
  liveSlideArrowLeft.addEventListener("click", liveMOEventDecrease);
  liveSlideArrowRight.addEventListener("click", liveMOEventIncrease);
} else {
  c = 0;
  liveSliceArea.style.transform = `translateX(0)`;
  liveSlideArrowLeft.removeEventListener("click", liveMOEventDecrease);
  liveSlideArrowRight.removeEventListener("click", liveMOEventIncrease);
  liveSlideArrowLeft.addEventListener("click", livePCEventDecrease);
  liveSlideArrowRight.addEventListener("click", livePCEventIncrease);
}

//JSON fetch

const liveInfo = (data) => {
  const brandArea = document.querySelectorAll(".ui_brand");
  const liveProductNameArea = document.querySelectorAll(".ui_name");
  const livePriceArea = document.querySelectorAll(".price");
  const liveRateArea = document.querySelectorAll(".sale_rate");
  const liveSalePriceArea = document.querySelectorAll(".sale_price_won");

  brandArea[0].innerText = data.products[1].productName.split("] ")[0] + "]";
  brandArea[1].innerText = data.products[5].productName.split("] ")[0] + "]";
  brandArea[2].innerText = data.products[8].productName.split("] ")[0] + "]";
  brandArea[3].innerText = "";
  brandArea[4].innerText = "";

  liveProductNameArea[0].innerText =
    data.products[1].productName.split("] ")[1];
  liveProductNameArea[1].innerText =
    data.products[5].productName.split("] ")[1];
  liveProductNameArea[2].innerText =
    data.products[8].productName.split("] ")[1];
  liveProductNameArea[3].innerText = data.products[9].productName;
  liveProductNameArea[4].innerText = data.products[16].productName;

  livePriceArea[0].innerText = `${new Intl.NumberFormat("ko-kr").format(
    data.products[1].originalPrice
  )}원`;
  livePriceArea[1].innerText = `${new Intl.NumberFormat("ko-kr").format(
    data.products[5].originalPrice
  )}원`;
  livePriceArea[2].innerText = `${new Intl.NumberFormat("ko-kr").format(
    data.products[8].originalPrice
  )}원`;
  livePriceArea[3].innerText = `${new Intl.NumberFormat("ko-kr").format(
    data.products[9].originalPrice
  )}원`;
  livePriceArea[4].innerText = `${new Intl.NumberFormat("ko-kr").format(
    data.products[16].originalPrice
  )}원`;

  liveRateArea[0].innerText = data.products[1].discount;
  liveRateArea[1].innerText = data.products[5].discount;
  liveRateArea[2].innerText = data.products[8].discount;
  liveRateArea[3].innerText = data.products[9].discount;
  liveRateArea[4].innerText = data.products[16].discount;

  liveSalePriceArea[0].innerText = `${new Intl.NumberFormat("ko-kr").format(
    data.products[1].price
  )}원`;
  liveSalePriceArea[1].innerText = `${new Intl.NumberFormat("ko-kr").format(
    data.products[5].price
  )}원`;
  liveSalePriceArea[2].innerText = `${new Intl.NumberFormat("ko-kr").format(
    data.products[8].price
  )}원`;
  liveSalePriceArea[3].innerText = `${new Intl.NumberFormat("ko-kr").format(
    data.products[9].price
  )}원`;
  liveSalePriceArea[4].innerText = `${new Intl.NumberFormat("ko-kr").format(
    data.products[16].price
  )}원`;
};

const todayImg = document.querySelectorAll(".product_img img");
const todayName = document.querySelectorAll(".today_product_name");
const todayOriPrice = document.querySelectorAll(".today_price");
const todayRating = document.querySelectorAll(".today_rating");
const todayPrice = document.querySelectorAll(".today_Sprice");
const todayReview = document.querySelectorAll(".today_Review");

const todayInfo = (data) => {
  let n = 0;
  for (let i = 0; i <= 1; i++) {
    const price = new Intl.NumberFormat("ko-kr").format(data.products[n].price);
    const originalPrice = new Intl.NumberFormat("ko-kr").format(
      data.products[n].originalPrice
    );
    todayImg[
      i
    ].parentElement.href = `./productdetail.html?id=${data.products[n].id}`;
    todayImg[i].src = data.products[n].thumbnail;
    todayName[
      i
    ].parentElement.href = `./productdetail.html?id=${data.products[n].id}`;
    todayName[i].innerText = data.products[n].productName;
    todayOriPrice[i].innerText = `${originalPrice}원`;
    todayRating[i].innerText = data.products[n].discount;
    todayPrice[i].innerText = `${price}원`;
    todayReview[i].innerText = data.products[n].reviews.length;
    n = n + 2;
  }
};

const limitedInfo = (data) => {
  const price = new Intl.NumberFormat("ko-kr").format(data.products[3].price);
  const originalPrice = new Intl.NumberFormat("ko-kr").format(
    data.products[3].originalPrice
  );
  todayImg[2].parentElement.href = `./productdetail.html?id=${data.products[3].id}`;
  todayImg[2].src = data.products[3].thumbnail;
  todayImg[2].style.position = "relative";
  todayImg[2].style.top = "-130px";
  todayName[2].parentElement.href = `./productdetail.html?id=${data.products[3].id}`;
  todayName[2].innerText = data.products[3].productName;
  todayOriPrice[2].innerText = `${originalPrice}원`;
  todayRating[2].innerText = data.products[3].discount;
  todayPrice[2].innerText = `${price}원`;
  todayReview[2].innerText = data.products[3].reviews.length;
};

const productInfoDetail = (data) => {
  const productImg = document.querySelectorAll(".product_item_img img");
  const productName = document.querySelectorAll(".product_name");
  const productOriPrice = document.querySelectorAll(".product_price");
  const productRating = document.querySelectorAll(".product_rating");
  const productPrice = document.querySelectorAll(".product_Sprice");
  const ratingCoupon = document.querySelectorAll(".rating_coupon");
  const productReview = document.querySelectorAll(".product_review");
  let n = 4;

  for (let i = 0; i < productImg.length; i++) {
    const price = new Intl.NumberFormat("ko-kr").format(data.products[n].price);
    const originalPrice = new Intl.NumberFormat("ko-kr").format(
      data.products[n].originalPrice
    );
    productImg[
      i
    ].parentElement.href = `./productdetail.html?id=${data.products[n].id}`;
    productImg[i].src = data.products[n].thumbnail;
    productName[
      i
    ].parentElement.href = `./productdetail.html?id=${data.products[n].id}`;
    productName[i].innerText = data.products[n].productName;
    productOriPrice[i].innerText = `${originalPrice}원`;
    productRating[i].innerText = data.products[n].discount;
    productPrice[i].innerText = `${price}원`;
    ratingCoupon[i].innerText = `${data.products[n].discount} 할인`;
    productReview[i].innerText = data.products[n].reviews.length;
    n++;
  }
};

const cartinModal = (data) => {
  const productCartin = document.querySelectorAll(".product_cartin");
  const modalArea = document.querySelector("#modal_area");
  const productModalImg = document.querySelector(".modal_img");
  const productModalName = document.querySelector(".modal_product_name");
  const productModalSubName = document.querySelector(".modal_subname");
  const productModalPrice = document.querySelector(".modal_discount_price");
  const productModalOriPrice = document.querySelector(".modal_Wprice");
  const countBtn = document.querySelectorAll(".modal_counter > span");
  const totalPrice = document.querySelector(".totalprice > span");
  let p = 1;
  let currentProductIndex = 0; // 현재 선택된 상품의 인덱스를 추적하는 변수
  productCartin.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      modalArea.classList.add("active");
      currentProductIndex = index; // 클릭된 상품의 인덱스 설정
      modalArea.querySelector("#overlay").addEventListener("click", () => {
        modalArea.classList.remove("active");
        p = 1;
        countBtn[1].innerText = p;
        updateTotalPrice(currentProductIndex); // 초기화 시 총 가격 업데이트
      });
      modalArea
        .querySelector(".button_cancle")
        .addEventListener("click", () => {
          modalArea.classList.remove("active");
          p = 1;
          countBtn[1].innerText = p;
          updateTotalPrice(currentProductIndex); // 초기화 시 총 가격 업데이트
        });
    });
  });

  const cartCounter = () => {
    countBtn[1].innerText = p;
    countBtn[0].addEventListener("click", () => {
      if (p > 1) {
        p--;
        countBtn[1].innerText = p;
        updateTotalPrice(currentProductIndex); // 감소 시 총 가격 업데이트
      } else if (p === 1) {
        countBtn[1].innerText = p;
      }
    });
    countBtn[2].addEventListener("click", () => {
      if (p < 99) {
        p++;
        countBtn[1].innerText = p;
        updateTotalPrice(currentProductIndex); // 증가 시 총 가격 업데이트
      }
    });
  };

  cartCounter();

  const cartCounterTotal = (i) => {
    let priceString = String(data.products[i].price);

    if (typeof priceString === "string") {
      priceString = priceString.replace(/[^0-9]/g, "");
    }

    let price = Number(priceString);
    let totalPrice = price * p;
    let result = new Intl.NumberFormat("ko-kr").format(totalPrice);
    return result;
  };

  const updateTotalPrice = (i) => {
    totalPrice.innerText = cartCounterTotal(i);
  };

  productCartin[0].addEventListener("click", () => {
    const price = new Intl.NumberFormat("ko-kr").format(data.products[0].price);
    const originalPrice = new Intl.NumberFormat("ko-kr").format(
      data.products[0].originalPrice
    );
    new Intl.NumberFormat("ko-kr").format(totalPrice);
    currentProductIndex = 0; // 첫 번째 제품의 인덱스 설정
    productModalImg.style.background = `url(${data.products[0].thumbnail}) center/cover no-repeat`;
    productModalName.innerText = data.products[0].productName;
    productModalSubName.innerText = data.products[0].productName;
    productModalPrice.innerText = `${price}원`;
    productModalOriPrice.innerText = `${originalPrice}원`;
    updateTotalPrice(0); // 첫 번째 제품의 총 가격 업데이트
  });

  const productCartinModalText = (i) => {
    productCartin[i - 1].addEventListener("click", () => {
      const price = new Intl.NumberFormat("ko-kr").format(
        data.products[i].price
      );
      const originalPrice = new Intl.NumberFormat("ko-kr").format(
        data.products[i].originalPrice
      );
      currentProductIndex = i; // 현재 선택된 제품의 인덱스 설정
      productModalImg.style.background = `url(${data.products[i].thumbnail}) center/cover no-repeat`;
      productModalName.innerText = data.products[i].productName;
      productModalSubName.innerText = data.products[i].productName;
      productModalPrice.innerText = `${price}원`;
      productModalOriPrice.innerText = `${originalPrice}원`;
      updateTotalPrice(i); // 선택된 제품의 총 가격 업데이트
    });
  };
  const saveToLocalStorage = (product, quantity) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let productIndex = cart.findIndex(
      (item) => item.productName === product.productName
    );

    if (productIndex !== -1) {
      cart[productIndex].quantity += quantity; // 기존 제품이 있으면 수량 추가
    } else {
      cart.push({ ...product, quantity }); // 새로운 제품 추가
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // 담기 버튼 클릭 시 로컬 스토리지에 저장
  document.querySelector(".button_cartin").addEventListener("click", () => {
    const selectedProduct = data.products[currentProductIndex];
    saveToLocalStorage(selectedProduct, p);
    modalArea.classList.remove("active"); // 모달 닫기
  });

  for (let i = 1; i < 17; i++) {
    productCartinModalText(i + 1);
  }
};

const productInfo = ".././json/db.json";
fetch(productInfo)
  .then((response) => response.json())
  .then((data) => {
    liveInfo(data);
    todayInfo(data);
    limitedInfo(data);
    productInfoDetail(data);
    cartinModal(data);
    console.log(data);
  });

// localstorage

// // 라이브 위치 이동(MO)
// const listClientWidth = liveSliceArea.clientWidth;
// const listScrollWidth = liveSliceArea.clientWidth + 900;

// // 최초 터치 및 마우스다운 지점
// let startX = 0;

// // 현재 이동중인 지점
// let nowX = 0;

// // 터치 종료 지점
// let endX = 0;

// // 두번째 터치 지점
// let listX = 0;

// const getClientX = (e) => {
//   return e.touches ? e.touches[0].clientX : e.clientX;
// };

// const getTranslateX = () => {
//   const transform = getComputedStyle(liveSliceArea).transform;
//   if (transform === "none") return 0;
//   return parseInt(transform.split(/[^\-0-9]+/g)[5]);
// };

// const setTranslateX = (x) => {
//   liveSliceArea.style.transform = `translateX(${x}px)`;
//   if (x === 0) {
//     liveSliceArea.style.transform = `translateX(20px)`;
//   }
// };

// const onScrollMove = (e) => {
//   e.preventDefault(); // 기본 스크롤 동작 방지
//   nowX = getClientX(e);
//   setTranslateX(listX + nowX - startX);
// };

// const onScrollEnd = () => {
//   endX = getTranslateX();
//   listX = getTranslateX();

//   // 이동 범위 조정
//   if (listX > 0) {
//     setTranslateX(0);
//     liveSliceArea.style.transition = `transform 0.3s ease`;
//     listX = 0;
//   } else if (listX < listClientWidth - listScrollWidth) {
//     setTranslateX(listClientWidth - listScrollWidth);
//     liveSliceArea.style.transition = `transform 0.3s ease`;
//     listX = listClientWidth - listScrollWidth;
//   } else {
//     liveSliceArea.style.transition = `transform 0.3s ease`;
//   }

//   // 이벤트 핸들러 제거
//   liveSliceArea.removeEventListener("touchmove", onScrollMove);
//   liveSliceArea.removeEventListener("mousemove", onScrollMove);
//   liveSliceArea.removeEventListener("touchend", onScrollEnd);
//   liveSliceArea.removeEventListener("mouseup", onScrollEnd);
// };

// const onScrollStart = (e) => {
//   startX = getClientX(e);
//   listX = getTranslateX();

//   liveSliceArea.addEventListener("touchmove", onScrollMove);
//   liveSliceArea.addEventListener("mousemove", onScrollMove);
//   liveSliceArea.addEventListener("touchend", onScrollEnd);
//   liveSliceArea.addEventListener("mouseup", onScrollEnd);
//   liveSliceArea.addEventListener("mouseleave", onScrollEnd);
// };

// window.addEventListener("resize", () => {
//   if (window.innerWidth < 1050) {
//     liveSliceArea.addEventListener("touchstart", onScrollStart);
//     liveSliceArea.addEventListener("mousedown", onScrollStart);
//     liveSliceArea.style.transform = "translateX(20px)";
//   } else {
//     liveSliceArea.removeEventListener("touchstart", onScrollStart);
//     liveSliceArea.removeEventListener("mousedown", onScrollStart);
//     liveSliceArea.removeEventListener("touchmove", onScrollMove);
//     liveSliceArea.removeEventListener("mousemove", onScrollMove);
//     liveSliceArea.removeEventListener("touchend", onScrollEnd);
//     liveSliceArea.removeEventListener("mouseup", onScrollEnd);
//     liveSliceArea.style.transform = "translateX(0px)";
//   }
// });

// // 초기 페이지 로드 시 화면 크기에 맞게 설정
// if (window.innerWidth < 1050) {
//   liveSliceArea.addEventListener("touchstart", onScrollStart);
//   liveSliceArea.addEventListener("mousedown", onScrollStart);
// }

// 타이머
const timer24 = document.querySelector("#timer24");
const timer500 = document.querySelector("#timer500");

const formatting = (time) => {
  let sec = Math.floor(time % 60);
  let checkmin = Math.floor(time / 60);
  let min = Math.floor(checkmin % 60);
  let hour = Math.floor(time / 3600);

  sec = sec < 10 ? `0${sec}` : sec;
  min = min < 10 ? `0${min}` : min;
  hour = hour < 10 ? `0${hour}` : hour;

  return `${hour}:${min}:${sec}`;
};

let t = 86400;
setInterval(() => {
  timer24.innerText = `${formatting(t)}`;
  t = t - 1;
}, 1000);

const counting = (count) => {
  count = count < 100 ? `0${count}` : count;
  count = count < 10 ? `00${count}` : count;

  return count;
};

let number = 501;
function decreaseNumber() {
  const randomMilliseconds =
    Math.floor(Math.random() * (10 - 1 + 1) + 1) * 1000;

  number--;

  timer500.innerText = `${counting(number)}개`;

  if (number > 0) {
    setTimeout(decreaseNumber, randomMilliseconds);
  } else {
    return;
  }
}

decreaseNumber();

// 인기상품
const productSliceArea = document.querySelectorAll(".product_items");
const product1SlideArrowLeft = document.querySelector("#product1_leftArrow");
const product1SlideArrowRight = document.querySelector("#product1_rightArrow");
const product2SlideArrowLeft = document.querySelector("#product2_leftArrow");
const product2SlideArrowRight = document.querySelector("#product2_rightArrow");
const productArea = document.querySelectorAll(".product_slide_area");

let slideStartProduct = [true, true];
let slideEndProduct = [false, false];

let startPointProduct = 0;
let endPointProduct = 0;
let productC = 0;

const mediaQuery = window.matchMedia("(min-width: 1050px)");

function handleSlideBehavior(e) {
  // 1050px 이상일 때
  if (e.matches) {
    // 기존 mousedown, mouseup, touchstart, touchend 이벤트 제거
    productArea.forEach((item) => {
      item.onmousedown = null;
      item.onmouseup = null;
      item.ontouchstart = null;
      item.ontouchend = null;
    });

    // 슬라이드 화살표 클릭 이벤트 추가
    for (let i = 0; i <= 1; i++) {
      if (i === 0) {
        product1SlideArrowLeft.onclick = () => {
          if (slideEndProduct[i] === true) {
            productSliceArea[i].style.transform = `translateX(0)`;
            slideStartProduct[i] = true;
            slideEndProduct[i] = false;
            product1SlideArrowLeft.style.opacity = "0";
            product1SlideArrowRight.style.opacity = "1";
          }
        };

        product1SlideArrowRight.onclick = () => {
          if (slideStartProduct[i] === true) {
            productSliceArea[i].style.transform = `translateX(-${
              mainWidth + 10
            }px)`;
            slideEndProduct[i] = true;
            slideStartProduct[i] = false;
            product1SlideArrowRight.style.opacity = "0";
            product1SlideArrowLeft.style.opacity = "1";
          }
        };
      } else {
        product2SlideArrowLeft.onclick = () => {
          if (slideEndProduct[i] === true) {
            productSliceArea[i].style.transform = `translateX(0)`;
            slideStartProduct[i] = true;
            slideEndProduct[i] = false;
            product2SlideArrowLeft.style.opacity = "0";
            product2SlideArrowRight.style.opacity = "1";
          }
        };

        product2SlideArrowRight.onclick = () => {
          if (slideStartProduct[i] === true) {
            productSliceArea[i].style.transform = `translateX(-${
              mainWidth + 10
            }px)`;
            slideEndProduct[i] = true;
            slideStartProduct[i] = false;
            product2SlideArrowRight.style.opacity = "0";
            product2SlideArrowLeft.style.opacity = "1";
          }
        };
      }
    }
  }
  // 1050px 이하일 때
  else {
    // 기존 화살표 클릭 이벤트 제거
    product1SlideArrowLeft.onclick = null;
    product1SlideArrowRight.onclick = null;
    product2SlideArrowLeft.onclick = null;
    product2SlideArrowRight.onclick = null;

    // 터치 및 마우스 이벤트 추가
    productArea.forEach((item) => {
      item.onmousedown = (e) => {
        startPointProduct = e.pageX; // 터치가 시작되는 위치 저장
      };
      item.onmouseup = (e) => {
        endPointProduct = e.pageX; // 터치가 끝나는 위치 저장
        if (startPointProduct < endPointProduct) {
          if (productC > 0) {
            productC--;
          } else {
            productC = 5;
          }
          item.querySelector(".product_items").style.transform = `translateX(${
            -productC * 177
          }px)`;
        } else if (startPointProduct > endPointProduct) {
          if (productC < 5) {
            productC++;
          } else {
            productC = 0;
          }
          item.querySelector(".product_items").style.transform = `translateX(${
            -productC * 177
          }px)`;
        }
      };
      item.ontouchstart = (e) => {
        startPointProduct = e.touches[0].pageX; // 터치가 시작되는 위치 저장
      };
      item.ontouchend = (e) => {
        endPointProduct = e.changedTouches[0].pageX; // 터치가 끝나는 위치 저장
        if (startPointProduct < endPointProduct) {
          if (productC > 0) {
            productC--;
          } else {
            productC = 5;
          }
          item.querySelector(".product_items").style.transform = `translateX(${
            -productC * 177
          }px)`;
        } else if (startPointProduct > endPointProduct) {
          if (productC < 5) {
            productC++;
          } else {
            productC = 0;
          }
          item.querySelector(".product_items").style.transform = `translateX(${
            -productC * 177
          }px)`;
        }
      };
    });
  }
}

// 초기 실행
handleSlideBehavior(mediaQuery);

// 화면 크기가 변경될 때 실행
mediaQuery.addEventListener("change", handleSlideBehavior);
window.addEventListener("resize", () => {
  if (window.innerWidth < 1050) {
    productSliceArea[0].style.transform = `translateX(0)`;
    productSliceArea[1].style.transform = `translateX(0)`;
  } else {
    productSliceArea[0].style.transform = `translateX(0)`;
    productSliceArea[1].style.transform = `translateX(0)`;
  }
});

// const productSliceArea = document.querySelectorAll(".product_items");
// const product1SlideArrowLeft = document.querySelector("#product1_leftArrow");
// const product1SlideArrowRight = document.querySelector("#product1_rightArrow");
// const product2SlideArrowLeft = document.querySelector("#product2_leftArrow");
// const product2SlideArrowRight = document.querySelector("#product2_rightArrow");
// const productArea = document.querySelectorAll(".product_slide_area");

// let slideStartProduct = [true, true];
// let slideEndProduct = [false, false];

// for (let i = 0; i <= 1; i++) {
//   if (i === 0) {
//     product1SlideArrowLeft.addEventListener("click", () => {
//       if (slideEndProduct[i] === true) {
//         productSliceArea[i].style.transform = `translateX(0)`;
//         slideStartProduct[i] = true;
//         slideEndProduct[i] = false;
//         product1SlideArrowLeft.style.opacity = "0";
//         product1SlideArrowRight.style.opacity = "1";
//       }
//     });

//     product1SlideArrowRight.addEventListener("click", () => {
//       if (slideStartProduct[i] === true) {
//         productSliceArea[i].style.transform = `translateX(-${
//           mainWidth + 10
//         }px)`;
//         slideEndProduct[i] = true;
//         slideStartProduct[i] = false;
//         product1SlideArrowRight.style.opacity = "0";
//         product1SlideArrowLeft.style.opacity = "1";
//       }
//     });
//   } else {
//     product2SlideArrowLeft.addEventListener("click", () => {
//       if (slideEndProduct[i] === true) {
//         productSliceArea[i].style.transform = `translateX(0)`;
//         slideStartProduct[i] = true;
//         slideEndProduct[i] = false;
//         product2SlideArrowLeft.style.opacity = "0";
//         product2SlideArrowRight.style.opacity = "1";
//       }
//     });

//     product2SlideArrowRight.addEventListener("click", () => {
//       if (slideStartProduct[i] === true) {
//         productSliceArea[i].style.transform = `translateX(-${
//           mainWidth + 10
//         }px)`;
//         slideEndProduct[i] = true;
//         slideStartProduct[i] = false;
//         product2SlideArrowRight.style.opacity = "0";
//         product2SlideArrowLeft.style.opacity = "1";
//       }
//     });
//   }
// }

// let startPointProduct = 0;
// let endPointProduct = 0;
// let productC = 0;

// productArea.forEach((item) => {
//   item.addEventListener("mousedown", (e) => {
//     startPointProduct = e.pageX; // 터치가 시작되는 위치 저장
//   });
//   item.addEventListener("mouseup", (e) => {
//     endPointProduct = e.pageX; // 터치가 끝나는 위치 저장
//     if (startPointProduct < endPointProduct) {
//       if (productC > 0) {
//         productC--;
//       } else {
//         productC = 5;
//       }
//       item.querySelector(".product_items").style.transform = `translateX(${
//         -productC * 177
//       }px)`;
//     } else if (startPointProduct > endPointProduct) {
//       if (productC < 5) {
//         productC++;
//       } else {
//         productC = 0;
//       }
//       item.querySelector(".product_items").style.transform = `translateX(${
//         -productC * 177
//       }px)`;
//     }
//   });
//   item.addEventListener("touchstart", (e) => {
//     startPointProduct = e.pageX; // 터치가 시작되는 위치 저장
//   });
//   item.addEventListener("touchend", (e) => {
//     endPointProduct = e.pageX; // 터치가 끝나는 위치 저장
//     if (startPointProduct < endPointProduct) {
//       if (productC > 0) {
//         productC--;
//       } else {
//         productC = 5;
//       }
//       item.querySelector(".product_items").style.transform = `translateX(${
//         -productC * 177
//       }px)`;
//     } else if (startPointProduct > endPointProduct) {
//       if (productC < 5) {
//         productC++;
//       } else {
//         productC = 0;
//       }
//       item.querySelector(".product_items").style.transform = `translateX(${
//         -productC * 177
//       }px)`;
//     }
//   });
// });

// const productSlide = (i) => {
//   let startXproduct = 0;
//   let nowXproduct = 0;
//   let listXproduct = 0;

//   const getClientXproduct = (e) => {
//     return e.touches ? e.touches[0].clientX : e.clientX;
//   };

//   const getTranslateXproduct = () => {
//     const transform = getComputedStyle(productItems[i]).transform;
//     if (transform === "none") return 0;
//     return parseInt(transform.split(/[^\-0-9]+/g)[5]);
//   };

//   const setTranslateXproduct = (x) => {
//     productItems[i].style.transform = `translateX(${x}px)`;
//   };

//   const onScrollMoveproduct = (e) => {
//     e.preventDefault();
//     nowXproduct = getClientXproduct(e);
//     setTranslateXproduct(listXproduct + nowXproduct - startXproduct);
//   };

//   const onScrollEndproduct = () => {
//     listXproduct = getTranslateXproduct();

//     // 슬라이드 가능한 전체 너비와 최대 이동 가능 거리 계산
//     const productAreaWidth = productArea[i].clientWidth;
//     const productScrollWidth = productItems[i].scrollWidth + 40;
//     const maxTranslateX = productAreaWidth - productScrollWidth;

//     // 스냅 위치 계산
//     if (listXproduct > 0) {
//       setTranslateXproduct(0);
//       listXproduct = 0;
//     } else if (listXproduct < maxTranslateX) {
//       setTranslateXproduct(maxTranslateX);
//       listXproduct = maxTranslateX;
//     } else {
//       // 가장 가까운 항목에 스냅
//       const itemWidth = productItems[i].children[0].clientWidth; // 슬라이드 아이템의 너비 + 간격
//       const nearestSnap = Math.round(listXproduct / itemWidth) * itemWidth;
//       setTranslateXproduct(nearestSnap);
//       listXproduct = nearestSnap;
//     }

//     productItems[i].style.transition = `transform 0.3s ease`;

//     // 이벤트 핸들러 제거
//     productArea[i].removeEventListener("touchmove", onScrollMoveproduct);
//     productArea[i].removeEventListener("mousemove", onScrollMoveproduct);
//     productArea[i].removeEventListener("touchend", onScrollEndproduct);
//     productArea[i].removeEventListener("mouseup", onScrollEndproduct);
//   };

//   const onScrollStartproduct = (e) => {
//     startXproduct = getClientXproduct(e);
//     listXproduct = getTranslateXproduct();

//     productArea[i].addEventListener("touchmove", onScrollMoveproduct);
//     productArea[i].addEventListener("mousemove", onScrollMoveproduct);
//     productArea[i].addEventListener("touchend", onScrollEndproduct);
//     productArea[i].addEventListener("mouseup", onScrollEndproduct);
//     productArea[i].addEventListener("mouseleave", onScrollEndproduct);
//   };

//   window.addEventListener("resize", () => {
//     if (window.innerWidth < 1050) {
//       productArea[i].addEventListener("touchstart", onScrollStartproduct);
//       productArea[i].addEventListener("mousedown", onScrollStartproduct);
//     } else {
//       productArea[i].removeEventListener("touchstart", onScrollStartproduct);
//       productArea[i].removeEventListener("mousedown", onScrollStartproduct);
//       productArea[i].removeEventListener("touchmove", onScrollMoveproduct);
//       productArea[i].removeEventListener("mousemove", onScrollMoveproduct);
//       productArea[i].removeEventListener("touchend", onScrollEndproduct);
//       productArea[i].removeEventListener("mouseup", onScrollEndproduct);
//       setTranslateXproduct(0); // 초기화
//     }
//   });

//   if (window.innerWidth < 1050) {
//     productArea[i].addEventListener("touchstart", onScrollStartproduct);
//     productArea[i].addEventListener("mousedown", onScrollStartproduct);
//   }
// };

// for (let i = 0; i < productArea.length; i++) {
//   productSlide(i);
// }

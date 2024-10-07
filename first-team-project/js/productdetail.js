// slide
$(document).ready(function () {
  $(".review_wrap").slick({
    slide: "div",
    infinite: true,
    autoplay: true, // 자동 재생 설정 (true or false)
    dots: false, // 페이지 네비게이션 점 보이기 설정 (true or false)
    arrows: false, // 이전/다음 버튼 보이기 설정 (true or false)
    speed: 1000, // 슬라이드 전환 속도 (밀리초 단위)
    autoplaySpeed: 5000, // 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
    slidesToShow: 3, // 한 화면에 보여줄 슬라이드 개수
    slidesToScroll: 1, // 한 번에 넘길 슬라이드 개수
    adaptiveHeight: true,
    responsive: [
      // 반응형 웹 구현 옵션
      {
        breakpoint: 1050,
        settings: {
          //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
          slidesToShow: 1,
        },
      },
    ],
  });
});

const choicePrice = document.querySelector(".PriceChoice");
const totalPrice = document.querySelector(".totalPrice");

// descIconBtnsAcrive
const descIconBtns = document.querySelectorAll(".desc_cart .item");
console.log(descIconBtns);
descIconBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    this.classList.toggle("active");
  });
});

// sharemodal
const shareBtn = document.querySelector(".share");
shareBtn.addEventListener("click", () => {
  document.querySelector(".share_modal").classList.toggle("active");
});
// infomodal
const infoBtn = document.querySelector(".desc_info > .info");
const infoModal = document.querySelector(".info_modal");
const infoModalCloseBtn = document.querySelector(".info_modal_closeBtn");
infoBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  infoModal.classList.add("active");
});

infoModalCloseBtn.addEventListener("click", () => {
  infoModal.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (!infoModal.contains(e.target)) {
    infoModal.classList.remove("active");
  }
});

// refundmodal
const refundFirstBtn = document.querySelector(".refund_firstBtn");
const refundSecondBtn = document.querySelector(".refund_secondBtn");

refundFirstBtn.addEventListener("click", () => {
  const refundModal = document.querySelector(".itemWrap .first");
  refundModal.classList.toggle("active");
  if (refundModal.classList.contains("active")) {
    refundFirstBtn.innerHTML = `닫기 <i class="fa-solid fa-chevron-up">`;
  } else {
    refundFirstBtn.innerHTML = `열기 <i class="fa-solid fa-chevron-down">`;
  }
});
refundSecondBtn.addEventListener("click", () => {
  const refundModal = document.querySelector(".itemWrap .second");
  refundModal.classList.toggle("active");
  if (refundModal.classList.contains("active")) {
    refundSecondBtn.innerHTML = `닫기 <i class="fa-solid fa-chevron-up">`;
  } else {
    refundSecondBtn.innerHTML = `열기 <i class="fa-solid fa-chevron-down">`;
  }
});

const mobileClose = document.querySelector(".mobileClose");
mobileClose.addEventListener("click", () => {
  window.history.back();
});

// json
const productInfo = ".././json/db.json";
fetch(productInfo)
  .then((resoponse) => resoponse.json())
  .then((data) => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    const product = data.products[productId - 1];
    const mobileHeaderTitle = document.querySelector(".mobileHeaderTitle");
    const thumbnail = document.querySelector(".thumbnail");
    const frozen = document.querySelector(".frozen");
    const productName = document.querySelector(".productName");
    const description = document.querySelector(".description");
    const originalPrice = document.querySelector(".originalPrice");
    const price = document.querySelector(".price");
    const totalPrice = document.querySelector(".totalPrice");
    const productImg = document.querySelector("#productImg");
    const productNameChoice = document.querySelector(".productNameChoice");
    const originalPriceChoice = document.querySelector(".originalPriceChoice");
    let PriceChoice = document.querySelector(".PriceChoice");
    const modalFrozen = document.querySelector(".modalFrozen");
    const packaging = document.querySelector(".packaging");
    const productWeight = document.querySelector(".productWeight");
    const allergyInfo = document.querySelector(".allergyInfo");
    const productCount = document.querySelector(".productCount");

    if (productId > 0 && productId < 21) {
      // 원화 변경
      let priceChanger = product.price;
      let originalPriceChanger = product.originalPrice;

      const priceKo = new Intl.NumberFormat("ko-kr").format(priceChanger);
      const originalPriceKo = new Intl.NumberFormat("ko-kr").format(
        originalPriceChanger
      );
      mobileHeaderTitle.innerText = product.productName;
      thumbnail.innerHTML = `<img src="${product.thumbnail}"/>`;
      productImg.innerHTML = `
      <img src="${product.productImg}"/>
      <img src="${product.productMobileImg}"/>
      `;
      frozen.innerText = product.frozen;
      if (product.frozen === "냉장") {
        frozen.style.backgroundColor = "#2CAA18";
      } else {
        frozen.style.backgroundColor = "#7897bc";
      }
      productName.innerText = product.productName;
      description.innerText = product.description;
      originalPrice.innerText = `${originalPriceKo}원`;
      price.innerHTML = `<h2><b>${product.discount}</b> ${priceKo}원</h2>`;
      totalPrice.innerText = `${priceKo}원`;
      productNameChoice.innerText = product.productName;
      originalPriceChoice.innerText = `${originalPriceKo}원`;
      PriceChoice.innerText = `${priceKo}원`;
      modalFrozen.innerText = `${product.frozen} (종이포장)`;
      packaging.innerText = product.packaging;
      productWeight.innerText = product.productWeight;
      allergyInfo.innerText = product.allergyInfo;
      //topreview
      const topReviewItem = document.querySelectorAll(".top_review_item");
      topReviewItem.forEach((item, i) => {
        item.innerHTML = `
        <div class="slide-img">
        <img src="${product.reviews[i].img}" />
      </div>
      <div class="desc">
        <div class="userId">
          <span>${product.reviews[i].username}</span>
          <span>${product.reviews[i].date}</span>
        </div>
        <p>${product.reviews[i].comment}</</p>
        <div class="like">
          <div>
            <i class="fa-regular fa-thumbs-up"></i>
            <span>도움돼요</span>
            <span>120</span>
          </div>
        </div>
      </div>`;
      });

      // bottomreview
      document.querySelector(
        ".review_total"
      ).innerText = `총 ${product.reviews.length}개`;
      const review_imgs = document.querySelectorAll(".review_imgs > div");
      review_imgs.forEach((item, i) => {
        item.innerHTML = `
        <div>
              <img
                src="${product.reviews[i].img}"
              />
            </div>
        `;
      });
      const review = document.querySelectorAll(".user_review > .review");
      const sortedReviews = product.reviews.sort((a, b) => {
        return b.like - a.like; // 좋아요 수를 기준으로 내림차순 정렬
      });
      // 정렬된 리뷰를 다시 DOM에 추가
      const reviewContainer = document.querySelector(".user_review");
      sortedReviews.forEach((review) => {
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review");
        reviewElement.innerHTML = `
          <div class="user">
            <span>베스트</span>
            <span>${review.username}</span>
          </div>
          <div class="desc">
            <span>${product.productName}</span>
            <span>${review.comment}</span>
            <div>
              <img src="${review.img}" alt="review" />
            </div>
            <span>${review.date}</span>
          </div>
          <div class="like">
            <span><i class="fa-regular fa-thumbs-up"></i> ${review.like}</span>
          </div>
        `;
        reviewContainer.appendChild(reviewElement); // 정렬된 리뷰 DOM에 추가
      });
      // 중복 출력 방지를 위한 기존 아이템 제거 함수
      // 기존 리뷰 아이템을 제거하는 함수
      const removeItems = () => {
        const reviewItems = document.querySelectorAll(".user_review > .review");
        reviewItems.forEach((item) => {
          item.remove(); // 선택된 모든 리뷰 아이템 제거
        });
      };
      const likeBtn = document.querySelector(".asceBtn");
      const latestBtn = document.querySelector(".latestBtn");

      const lickBtnSort = (e) => {
        latestBtn.style.color = "#b5b5b5";
        likeBtn.style.color = "#000";
        e.preventDefault(); // 기본 동작 방지
        const sortedReviews = product.reviews.sort((a, b) => {
          return b.like - a.like; // 좋아요 수를 기준으로 내림차순 정렬
        });
        removeItems(); // 기존 리뷰 아이템 제거
        // 정렬된 리뷰를 다시 DOM에 추가
        const reviewContainer = document.querySelector(".user_review");
        sortedReviews.forEach((review) => {
          const reviewElement = document.createElement("div");
          reviewElement.classList.add("review");
          reviewElement.innerHTML = `
            <div class="user">
              <span>베스트</span>
              <span>${review.username}</span>
            </div>
            <div class="desc">
              <span>${product.productName}</span>
              <span>${review.comment}</span>
              <div>
                <img src="${review.img}" alt="review" />
              </div>
              <span>${review.date}</span>
            </div>
            <div class="like">
              <span><i class="fa-regular fa-thumbs-up"></i> ${review.like}</span>
            </div>
          `;
          reviewContainer.appendChild(reviewElement); // 정렬된 리뷰 DOM에 추가
        });
      };

      const latestBtnSort = (e) => {
        e.preventDefault();
        latestBtn.style.color = "#000";
        likeBtn.style.color = "#b5b5b5";
        const sortedReviews = product.reviews.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        removeItems();
        const like = document.querySelector(".like");
        like.addEventListener("click", () => {});
        const reviewContainer = document.querySelector(".user_review");
        sortedReviews.forEach((review) => {
          const reviewElement = document.createElement("div");
          reviewElement.classList.add("review");
          reviewElement.innerHTML = `
            <div class="user">
              <span>베스트</span>
              <span>${review.username}</span>
            </div>
            <div class="desc">
              <span>${product.productName}</span>
              <span>${review.comment}</span>
              <div>
                <img src="${review.img}" alt="review" />
              </div>
              <span>${review.date}</span>
            </div>
            <div class="like">
              <span><i class="fa-regular fa-thumbs-up"></i> ${review.like}</span>
            </div>
          `;
          reviewContainer.appendChild(reviewElement); // 정렬된 리뷰 DOM에 추가
        });
      };
      // 내림차순 버튼에 이벤트 리스너 추가
      likeBtn.addEventListener("click", lickBtnSort);
      //  최근등록순 버튼에 이벤트 추가
      latestBtn.addEventListener("click", latestBtnSort);

      // productCounter
      const productCounterPlus = document.querySelector(".counterPlus");
      const productCounterMinus = document.querySelector(".counterMinus");
      let productCounter = 1;
      productCounterPlus.addEventListener("click", () => {
        if (productCounter < 99) {
          priceChanger += product.price;
          originalPriceChanger += product.originalPrice;
          const priceKo = new Intl.NumberFormat("ko-kr").format(priceChanger);
          const originalPriceKo = new Intl.NumberFormat("ko-kr").format(
            originalPriceChanger
          );
          PriceChoice.innerText = `${priceKo}원`;
          totalPrice.innerText = `${priceKo}원`;
          originalPriceChoice.innerText = `${originalPriceKo}원`;
          productCount.innerText = `${
            productCounter >= 1 ? (productCounter += 1) : (productCounter = 1)
          }`;
        }
      });
      productCounterMinus.addEventListener("click", () => {
        if (priceChanger && originalPriceChanger) {
          if (priceChanger > product.price) {
            priceChanger -= product.price;
            originalPriceChanger -= product.originalPrice;
          }
        }
        const priceKo = new Intl.NumberFormat("ko-kr").format(priceChanger);
        const originalPriceKo = new Intl.NumberFormat("ko-kr").format(
          originalPriceChanger
        );
        PriceChoice.innerText = `${priceKo}원`;
        totalPrice.innerText = `${priceKo}원`;
        originalPriceChoice.innerText = `${originalPriceKo}원`;
        productCount.innerText = `${
          productCounter > 1 ? (productCounter -= 1) : (productCounter = 1)
        }`;
      });
    } else {
      alert("잘못된 접근입니다.");
      window.history.back();
    }

    createModal(product);
    const cartBtn = document.querySelector(".button_cartin");

    cartBtn.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      // 장바구니에 동일한 상품이 있는지 확인
      const existingProductIndex = cart.findIndex(
        (item) => item.id === product.id
      );
      // 상품이 이미 장바구니에 있으면 수량만 증가
      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += parseInt(
          document.querySelector(".modal_counter > span:nth-child(2)").innerText
        );
      } else {
        // 상품이 없으면 장바구니에 추가
        product.quantity = parseInt(
          document.querySelector(".modal_counter > span:nth-child(2)").innerText
        );
        cart.push(product);
      }
      // 로컬스토리지에 업데이트된 장바구니 데이터를 저장
      localStorage.setItem("cart", JSON.stringify(cart));

      const cartModal = document.querySelector(".modal_area");
      cartModal.classList.remove("active");
    });
  })
  .catch((error) => {
    console.log(error);
  });

// cart modal
const cartModal = document.querySelector(".modal_area");

const createModal = (product) => {
  cartModal.innerHTML = `
  <div id="overlay"></div>
      <div id="modal">
        <div class="modal_top">
          <img src="${product.thumbnail}" class="modal_img">
            
          </img>
          <div class="modal_product_name">
            ${product.productName}
          </div>
        </div>
        <div class="modal_middle">
          <div class="modal_subname">
          ${product.productName}
          </div>
          <div class="modal_price_counter">
            <div class="modal_price">
              <div class="modal_discount_price">${new Intl.NumberFormat(
                "ko-kr"
              ).format(product.price)}원</div>
              <div class="modal_Wprice">${new Intl.NumberFormat("ko-kr").format(
                product.originalPrice
              )}원</div>
            </div>
            <div class="modal_counter">
              <span>-</span>
              <span>1</span>
              <span>+</span>
            </div>
          </div>
        </div>
        <div class="modal_bottom">
          <div class="modal_totalprice">
            <div>합계</div>
            <div class="totalprice"><span>${new Intl.NumberFormat(
              "ko-kr"
            ).format(product.price)}</span>원</div>
          </div>
          <div class="modal_buttons">
            <div class="button_cancle">취소</div>
            <div class="button_cartin">장바구니 담기</div>
          </div>
        </div>
      </div>
  `;

  const modalBtn = document.querySelector(".cartIn");
  const totalprice = document.querySelector(".totalprice");

  const cartModalClose = document.querySelector(".button_cancle");
  const countBtn = document.querySelectorAll(".modal_counter > span");

  modalBtn.addEventListener("click", () => {
    cartModal.classList.add("active");
  });
  cartModalClose.addEventListener("click", () => {
    cartModal.classList.remove("active");
  });

  const cartCounter = () => {
    let p = 1;
    countBtn[1].innerText = p;
    countBtn[0].addEventListener("click", () => {
      if (p > 1) {
        p--;
        countBtn[1].innerText = p;
        totalprice.innerHTML = `<span>${new Intl.NumberFormat("ko-kr").format(
          product.price * p
        )}</span>원`;
      } else if (p === 1) {
        countBtn[1].innerText = p;
      }
    });
    countBtn[2].addEventListener("click", () => {
      if (p < 99) {
        p++;
        countBtn[1].innerText = p;
        totalprice.innerHTML = `<span>${new Intl.NumberFormat("ko-kr").format(
          product.price * p
        )}</span>원`;
      }
    });
  };
  cartCounter();
};

// scroll
window.addEventListener("scroll", () => {
  const productImg = document.querySelector("#productImg");
  const refund = document.querySelector("#refund");
  const bottomReview = document.querySelector("#bottom_review");
  const inquiry = document.querySelector("#inquiry");
  const topButton = document.querySelector(".topButton");

  const productImgPosition = productImg.offsetTop;
  const refundPosition = refund.offsetTop;
  const bottomReviewPosition = bottomReview.offsetTop;
  const inquiryPosition = inquiry.offsetTop;
  if (window.scrollY >= productImgPosition - window.innerHeight / 2) {
    document.querySelector(".gnbItem:nth-child(1)").classList.add("active");
  } else {
    document.querySelector(".gnbItem:nth-child(1)").classList.remove("active");
  }
  if (window.scrollY >= refundPosition - window.innerHeight / 2) {
    document.querySelector(".gnbItem:nth-child(2)").classList.add("active");
    document.querySelector(".gnbItem:nth-child(1)").classList.remove("active");
  } else {
    document.querySelector(".gnbItem:nth-child(2)").classList.remove("active");
  }
  if (window.scrollY >= bottomReviewPosition - window.innerHeight / 2.7) {
    document.querySelector(".gnbItem:nth-child(3)").classList.add("active");
    document.querySelector(".gnbItem:nth-child(2)").classList.remove("active");
  } else {
    document.querySelector(".gnbItem:nth-child(3)").classList.remove("active");
  }
  if (window.scrollY >= inquiryPosition - window.innerHeight / 2) {
    document.querySelector(".gnbItem:nth-child(4)").classList.add("active");
    document.querySelector(".gnbItem:nth-child(3)").classList.remove("active");
  } else {
    document.querySelector(".gnbItem:nth-child(4)").classList.remove("active");
  }

  if (window.scrollY >= 500) {
    topButton.classList.add("active");
  } else if (window.scrollY < 500) {
    topButton.classList.remove("active");
  }
});

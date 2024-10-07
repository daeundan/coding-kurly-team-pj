$(document).ready(function () {
  $(".rec-item-box").slick({
    slide: "div",
    infinite: false,
    autoplay: true, // 자동 재생 설정 (true or false)
    dots: false, // 페이지 네비게이션 점 보이기 설정 (true or false)
    arrows: false, // 이전/다음 버튼 보이기 설정 (true or false)
    speed: 500, // 슬라이드 전환 속도 (밀리초 단위)
    autoplaySpeed: 5000, // 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
    slidesToShow: 4, // 한 화면에 보여줄 슬라이드 개수
    slidesToScroll: 1, // 한 번에 넘길 슬라이드 개수
    adaptiveHeight: true,
    responsive: [
      // 반응형 웹 구현 옵션
      {
        breakpoint: 1050,
        settings: {
          //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
          slidesToShow: 3,
        },
      },
    ],
  });
});
const cartRecItem = document.querySelectorAll(
  ".cart-rec-item:not(.slick-cloned)"
);
const cartRecImg = document.querySelector(".cart-rec-img");
const mobileClose = document.querySelector(".mobileClose");
mobileClose.addEventListener("click", () => {
  window.history.back();
});

const productInfo = ".././json/db.json";
fetch(productInfo)
  .then((response) => response.json())
  .then((data) => {
    cartRecItem.forEach((item, index) => {
      // console.log(item, index);
      if (data.products[index]) {
        const product = data.products[index];
        // 원화 변경
        let priceChanger = product.price;
        let originalPriceChanger = product.originalPrice;
        const priceKo = new Intl.NumberFormat("ko-kr").format(priceChanger);
        const originalPriceKo = new Intl.NumberFormat("ko-kr").format(
          originalPriceChanger
        );
        item.innerHTML = `
    <div class="cart-rec-item">
              <div class="cart-rec-img">
                <a href="./productdetail.html?id=${index + 1}">  
                  <img src="${product.thumbnail}" />
                </a>
              </div>
              <div class="rec-price-coupon">
                <span>${product.discount} 세일</span>
              </div>
              <div class="cart-rec-btn">
                <button>
                  <i class="fa-solid fa-cart-shopping"></i>
                  <span>담기</span>
                </button>
              </div>
              <div class="cart_rec_text">
                <div class="cart_rec_price">
                  <ul class="rec_text01">
                  <a href="./productdetail.html?id=${index + 1}">  
                    <li>${product.productName}</li>
                  </a>
                    <strike>${originalPriceKo}원</strike>
                  </ul>
                  <ul class="rec_text02">
                    <li class="percent">${product.discount}</li>
                    <li class="price">${priceKo}원</li>
                  </ul>
                </div>
                <div class="comment_text">
                  <i class="fa-regular fa-comment-dots"></i>
                  <p>${product.reviews.length}</p>
                </div>
              </div>
            </div>
    `;

        // 로컬스토리지 카트 담기
        const cartBtn = item.querySelector(".cart-rec-btn");
        cartBtn.addEventListener("click", () => {
          let cart = JSON.parse(localStorage.getItem("cart")) || [];
          // 장바구니에 동일한 상품이 있는지 확인
          const existingProductIndex = cart.findIndex(
            (item) => item.id === product.id
          );
          // console.log(existingProductIndex);
          if (existingProductIndex !== -1) {
            // 상품이 이미 장바구니에 있으면 수량만 증가
            cart[existingProductIndex].quantity += 1;
          } else {
            // 상품이 없으면 장바구니에 추가
            product.quantity = 1;
            cart.push(product);
          }
          // 로컬스토리지에 업데이트된 장바구니 데이터를 저장
          localStorage.setItem("cart", JSON.stringify(cart));
        });
      } else {
        console.error(`Product at index ${index} is undefined`);
      }
    });
  })
  .catch((error) => {
    console.log(error);
  });

//로컬스토리지에 저장된 상품 장바구니 출력
const loadCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let itemInnerBox = document.querySelector(".item-inner-box");

  const updateTotalAmounts = () => {
    let totalAmount = 0;
    let totalOriginalAmount = 0;

    cart.forEach((product) => {
      totalAmount += product.price * product.quantity;
      totalOriginalAmount += product.originalPrice * product.quantity;
    });

    const discountAmount = totalOriginalAmount - totalAmount;
    const totalAmountFormatted = new Intl.NumberFormat("ko-kr").format(
      totalAmount
    );
    const discountAmountFormatted = new Intl.NumberFormat("ko-kr").format(
      discountAmount
    );
    const totalOriginalAmountFormatted = new Intl.NumberFormat("ko-kr").format(
      totalOriginalAmount
    );

    document.querySelector(
      ".cart-price-box .price:nth-child(1) span:nth-child(2)"
    ).textContent = `${totalOriginalAmountFormatted}원`;
    document.querySelector(
      ".cart-price-box .price:nth-child(2) span:nth-child(2)"
    ).textContent = `-${discountAmountFormatted}원`;
    document.querySelector(
      ".cart-price-box .total-price span:nth-child(2)"
    ).textContent = `${totalAmountFormatted}원`;
  };

  const renderCart = () => {
    itemInnerBox.innerHTML = ""; // 기존 HTML을 초기화
    cart.forEach((product, index) => {
      const priceKo = new Intl.NumberFormat("ko-kr").format(
        product.price * product.quantity
      );
      const originalPriceKo = new Intl.NumberFormat("ko-kr").format(
        product.originalPrice * product.quantity
      );

      // HTML 추가
      itemInnerBox.innerHTML += `
        <div id="prozen-item-example" data-index="${index}">
          <div id="prozen-item">
            <div class="check-img">
              <div class="checkbox">
                <label class="custom-checkbox">
                  <input type="checkbox" id="selectAll" />
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="cart-item-text">
                <img src="${product.thumbnail}" />
                <div class="delivery_mark">
                  <div class="delivery_info">
                    <span class="frozen-status">${product.frozen}</span>
                    <span class="delivery_text">
                      <i class="fa-solid fa-truck-fast"></i> 샛별배송
                    </span>
                    <span>내일 새벽 도착</span>
                  </div>
                  <a href="./productdetail.html?id=${product.id}"> 
                  <span class="product-title-name">${product.productName}</span>
                  </a>
                </div>
              </div>
            </div>
            <div class="cart_price_num_box">
              <div class="cart-item-price">
                <span class="totalPrice">${priceKo}원</span>
                <strike class="totalOriginalPrice">${originalPriceKo}원</strike>
              </div>
              <div class="check-num">
                <span class="counterMinus">-</span>
                <span class="productCount">${product.quantity}</span>
                <span class="counterPlus">+</span>
              </div>
              <div class="x-mark">
                <i class="fa-solid fa-trash-can"></i>
              </div>
            </div>
          </div>
        </div>
      `;

      // 냉장/냉동 상태에 따른 글자 색상 설정
      const frozenStatusElement = itemInnerBox.querySelector(
        `#prozen-item-example[data-index="${index}"] .frozen-status`
      );
      if (product.frozen === "냉장") {
        frozenStatusElement.style.backgroundColor = "#def1eb";
        frozenStatusElement.style.color = "#67bfa4";
        // 냉장일 경우 초록색
      } else {
        frozenStatusElement.style.backgroundColor = "#dfebf9"; // 냉동일 경우 파란색
      }
    });

    // 총 금액을 초기화
    updateTotalAmounts();

    // 플러스 버튼 이벤트 리스너 설정
    itemInnerBox.querySelectorAll(".counterPlus").forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.closest("#prozen-item-example").getAttribute(
          "data-index"
        );
        cart[index].quantity += 1;

        // 수량 표시 업데이트
        this.previousElementSibling.textContent = cart[index].quantity;

        // 가격 업데이트
        const newTotalPrice = new Intl.NumberFormat("ko-kr").format(
          cart[index].price * cart[index].quantity
        );
        const newOriginalPrice = new Intl.NumberFormat("ko-kr").format(
          cart[index].originalPrice * cart[index].quantity
        );
        this.closest("#prozen-item-example").querySelector(
          ".totalPrice"
        ).textContent = `${newTotalPrice}원`;
        this.closest("#prozen-item-example").querySelector(
          ".totalOriginalPrice"
        ).textContent = `${newOriginalPrice}원`;

        // 로컬스토리지 업데이트
        localStorage.setItem("cart", JSON.stringify(cart));

        // 총 금액 업데이트
        updateTotalAmounts();
      });
    });

    // 마이너스 버튼 이벤트 리스너 설정
    itemInnerBox.querySelectorAll(".counterMinus").forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.closest("#prozen-item-example").getAttribute(
          "data-index"
        );

        // 수량이 1보다 큰 경우에만 감소시킴
        if (cart[index].quantity > 1) {
          cart[index].quantity -= 1;

          // 수량 표시 업데이트
          this.nextElementSibling.textContent = cart[index].quantity;

          // 가격 업데이트
          const newTotalPrice = new Intl.NumberFormat("ko-kr").format(
            cart[index].price * cart[index].quantity
          );
          const newOriginalPrice = new Intl.NumberFormat("ko-kr").format(
            cart[index].originalPrice * cart[index].quantity
          );
          this.closest("#prozen-item-example").querySelector(
            ".totalPrice"
          ).textContent = `${newTotalPrice}원`;
          this.closest("#prozen-item-example").querySelector(
            ".totalOriginalPrice"
          ).textContent = `${newOriginalPrice}원`;

          // 로컬스토리지 업데이트
          localStorage.setItem("cart", JSON.stringify(cart));

          // 총 금액 업데이트
          updateTotalAmounts();
        }
      });
    });

    // 휴지통 버튼 이벤트 리스너 설정 (제품 삭제)
    itemInnerBox.querySelectorAll(".x-mark").forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.closest("#prozen-item-example").getAttribute(
          "data-index"
        );

        // 해당 상품 삭제
        cart.splice(index, 1);
        const cartEmptyText = document.querySelector(".cart_empty_text");

        if (cart.length === 0) {
          // 장바구니가 비어 있으면 메시지와 패딩 적용
          cartEmptyText.innerText = `장바구니에 담긴 상품이 없습니다.`;
          cartEmptyText.style.padding = "100px";
        } else {
          // 장바구니에 상품이 있으면 패딩을 없앰
          cartEmptyText.innerText = ""; // 또는 다른 메시지를 설정할 수 있음
          cartEmptyText.style.padding = "0";
        }

        // 로컬스토리지 업데이트
        localStorage.setItem("cart", JSON.stringify(cart));

        // UI 업데이트 (재렌더링)
        renderCart();
      });
    });
  };
  if (cart.length === 0) {
    document.querySelector(
      ".cart_empty_text"
    ).innerText = `장바구니에 담긴 상품이 없습니다.`;
    const cartEmptyText = document.querySelector(".cart_empty_text");

    if (cart.length === 0) {
      // 장바구니가 비어 있으면 메시지와 패딩 적용
      cartEmptyText.innerText = `장바구니에 담긴 상품이 없습니다.`;
      cartEmptyText.style.padding = "100px";
    } else {
      // 장바구니에 상품이 있으면 패딩을 없앰
      cartEmptyText.innerText = ""; // 또는 다른 메시지를 설정할 수 있음
      cartEmptyText.style.padding = "0";
    }
  }

  // 처음 렌더링
  renderCart();
};
const chiceProductBtn = document.querySelector(".check-item-del");

chiceProductBtn.addEventListener("click", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const selectedItems = document.querySelectorAll(
    '.item-inner-box .custom-checkbox input[type="checkbox"]:checked'
  );

  selectedItems.forEach((checkbox) => {
    const index = checkbox.getAttribute("data-index");
    cart.splice(index, 1); // 선택된 상품 삭제
  });

  // 로컬스토리지에 업데이트된 장바구니 데이터 저장
  localStorage.setItem("cart", JSON.stringify(cart));

  // UI 업데이트 (재렌더링)
  loadCart();
});

loadCart();
// 주문하기 모달
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

// 모달 닫기

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

// 카카오 주소 모달창
// var mapContainer = document.getElementById("map"), // 지도를 표시할 div
//   mapOption = {
//     center: new daum.maps.LatLng(37.537187, 127.005476),
//     level: 5, // 지도의 확대 레벨
//   };

//지도를 미리 생성
// var map = new daum.maps.Map(mapContainer, mapOption);
//주소-좌표 변환 객체를 생성
// var geocoder = new daum.maps.services.Geocoder();
//마커를 미리 생성
// var marker = new daum.maps.Marker({
//   position: new daum.maps.LatLng(37.537187, 127.005476),
//   map: map,
// });

function sample5_execDaumPostcode() {
  new daum.Postcode({
    theme: {
      searchBgColor: "#5F0080",
      queryTextColor: "#FFFFFF",
      emphTextColor: "#5F0080",
    },
    oncomplete: function (data) {
      document.querySelector("#sample5_address").style.display = "block";
      document.querySelector(".adressText").innerHTML =
        "<b>추가 입력 사항</b>을 기입해주세요";
      var addr = data.address; // 최종 주소 변수

      // 주소 정보를 해당 필드에 넣는다.
      document.getElementById("sample5_address").value = addr;
      // 주소로 상세 정보를 검색
      // geocoder.addressSearch(data.address, function (results, status) {
      //   // 정상적으로 검색이 완료됐으면
      //   if (status === daum.maps.services.Status.OK) {
      //     var result = results[0]; //첫번째 결과의 값을 활용

      //     // 해당 주소에 대한 좌표를 받아서
      //     var coords = new daum.maps.LatLng(result.y, result.x);
      //     // 지도를 보여준다.
      //     mapContainer.style.display = "block";
      //     map.relayout();
      //     // 지도 중심을 변경한다.
      //     map.setCenter(coords);
      //     // 마커를 결과값으로 받은 위치로 옮긴다.
      //     marker.setPosition(coords);
      //   }
      // });
    },
  }).open();
}

// 전체 선택
// "selectAll" 체크박스에 이벤트 리스너 추가
document.getElementById("selectAll").addEventListener("change", function () {
  const isChecked = this.checked;
  const itemCheckboxes = document.querySelectorAll(
    '.item-inner-box .custom-checkbox input[type="checkbox"]'
  );
  itemCheckboxes.forEach((checkbox) => {
    checkbox.checked = isChecked;
    const checkmark = checkbox.nextElementSibling;
    if (isChecked) {
      checkmark.classList.add("checked");
    } else {
      checkmark.classList.remove("checked");
    }
  });
});

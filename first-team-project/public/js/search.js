const urlParams = new URLSearchParams(window.location.search);
const keyword = urlParams.get("query");

const form = document.querySelector(".header_main_center > form");
const productItems = document.querySelector(".product_items");
let allProducts = [];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
};

const createProduct = (product) => {
  const price = createKoPrice(product);
  const productItem = document.createElement("div");
  productItem.classList.add("product_item");
  productItem.innerHTML = `
    <div class="product_item">
      <div class="product_item_img">
        <a href="./productdetail.html?id=${product.id}">
          <img src="${product.thumbnail}" alt="product_01" />
        </a>
        <div class="rating_coupon">${product.discount} 할인</div>
      </div>
      <div class="product_cartin">
        <i class="fa-solid fa-cart-shopping"></i>
        <p>담기</p>
      </div>
      <div class="product_item_text">
      <a href="./productdetail.html?id=${product.id}">
        <p class="product_name">
          ${product.productName}
        </p>
      </a>
        <div class="product_item_text_bottom">
          <p class="product_price">${price.originalPriceKo}원</p>
          <div class="product_salePrice">
            <p class="product_rating">${product.discount}</p>
            <p class="product_Sprice">${price.priceKo}원</p>
          </div>
          <div class="comment_text">
            <i class="fa-regular fa-comment-dots"></i>
            <p>${product.reviews.length}</p>
          </div>
        </div>
      </div>
    </div>
  `;
  productItems.appendChild(productItem);
};

const createKoPrice = (product) => {
  const originalPriceKo = new Intl.NumberFormat("ko-kr").format(
    product.originalPrice
  );
  const priceKo = new Intl.NumberFormat("ko-kr").format(product.price);
  return { originalPriceKo, priceKo };
};

const removeAll = () => {
  const productItem = document.querySelectorAll(".product_item");
  productItem.forEach((item) => {
    item.remove();
  });
};

const searchProduct = (e) => {
  e.preventDefault();
  const searchInput = document.querySelector(".searchInput");
  const keyword = searchInput.value.trim();

  if (keyword) {
    window.location.href = `search.html?query=${encodeURIComponent(keyword)}`;
  }
};

const filterAndDisplayProducts = (keyword) => {
  removeAll(); // 기존 상품 제거
  let productsToDisplay = allProducts;

  if (keyword) {
    productsToDisplay = allProducts.filter((product) =>
      product.productName.includes(keyword)
    );
  }

  if (productsToDisplay.length > 0) {
    // 배열을 무작위로 섞고 상품 표시
    const shuffledProducts = shuffleArray(productsToDisplay);
    shuffledProducts.forEach((product) => {
      createProduct(product);
    });
  } else {
    document.querySelector(
      ".noItem"
    ).innerHTML = `<div><span>등록된 상품이 없습니다.</span></div>`;
  }
};

const cartinModal = (products) => {
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
      currentProductIndex = index;
      modalArea.querySelector("#overlay").addEventListener("click", () => {
        modalArea.classList.remove("active");
        p = 1;
        countBtn[1].innerText = p;
        updateTotalPrice(currentProductIndex);
      });
      modalArea
        .querySelector(".button_cancle")
        .addEventListener("click", () => {
          modalArea.classList.remove("active");
          p = 1;
          countBtn[1].innerText = p;
          updateTotalPrice(currentProductIndex);
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
    let priceString = String(products[i].price);

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
    const price = new Intl.NumberFormat("ko-kr").format(products[0].price);
    const originalPrice = new Intl.NumberFormat("ko-kr").format(
      products[0].originalPrice
    );
    new Intl.NumberFormat("ko-kr").format(totalPrice);
    currentProductIndex = 0; // 첫 번째 제품의 인덱스 설정
    productModalImg.style.background = `url(${products[0].thumbnail}) center/cover no-repeat`;
    productModalName.innerText = products[0].productName;
    productModalSubName.innerText = products[0].productName;
    productModalPrice.innerText = `${price}원`;
    productModalOriPrice.innerText = `${originalPrice}원`;
    updateTotalPrice(0); // 첫 번째 제품의 총 가격 업데이트
  });

  const productCartinModalText = (i) => {
    productCartin[i - 1].addEventListener("click", () => {
      const price = new Intl.NumberFormat("ko-kr").format(
        products[i - 1].price
      );
      const originalPrice = new Intl.NumberFormat("ko-kr").format(
        products[i - 1].originalPrice
      );
      currentProductIndex = i - 1; // 현재 선택된 제품의 인덱스를 올바르게 설정
      productModalImg.style.background = `url(${
        products[i - 1].thumbnail
      }) center/cover no-repeat`;
      productModalName.innerText = products[i - 1].productName;
      productModalSubName.innerText = products[i - 1].productName;
      productModalPrice.innerText = `${price}원`;
      productModalOriPrice.innerText = `${originalPrice}원`;
      updateTotalPrice(i - 1); // 선택된 제품의 총 가격 업데이트
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
    const selectedProduct = products[currentProductIndex];
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
  .then(({ products }) => {
    allProducts = products;
    filterAndDisplayProducts(keyword); // 페이지 로드 시 필터링 실행
    cartinModal(products);
    console.log(products);
  });

form.addEventListener("submit", searchProduct);

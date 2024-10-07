const categoryBtn = document.querySelector(".lnb");
const categoryGnb = document.querySelector(".category");
const subCategoryGnb = document.querySelector(".subCategory");
const customerServiceBtn = document.querySelector(".customerServiceBtn");
const customerService = document.querySelector(".customerService");
const userIdandPass = document.querySelector(
  ".header_top_bar span:nth-child(1)"
);
const userIdandPass2 = document.querySelector(
  ".header_top_bar span:nth-child(2)"
);
console.log(userIdandPass, userIdandPass2);

if (localStorage.getItem("id")) {
  const userIdName = localStorage.getItem("id");
  userIdandPass.innerText = `${userIdName}님 환영합니다.`;
  userIdandPass2.innerText = `로그아웃`;
  userIdandPass2.addEventListener("click", () => {
    window.localStorage.removeItem("id");
    userIdandPass.innerText = `회원가입`;
    userIdandPass2.innerText = `로그인`;
    window.location.href = "./login.html";
  });
}

categoryBtn.addEventListener("mouseover", () => {
  categoryGnb.classList.add("active");
});
categoryBtn.addEventListener("mouseout", () => {
  categoryGnb.classList.remove("active");
});
customerServiceBtn.addEventListener("mouseover", () => {
  customerService.classList.add("active");
});
customerServiceBtn.addEventListener("mouseout", () => {
  customerService.classList.remove("active");
});

const categoryInfo = ".././json/headerCategory.json";
fetch(categoryInfo)
  .then((respone) => respone.json())
  .then((data) => {
    let idCounter = Date.now();
    const categorys = {
      data: data.data.map((i) => ({
        ...i,
        id: idCounter++,
      })),
    };
    const createItem = (category) => {
      const headerCategory = document.querySelector(".category");
      const categoryImg = document.createElement("img");
      const attr = document.createAttribute("src");
      const categoryDiv = document.createElement("div");
      const categorySpan = document.createElement("span");

      categoryDiv.id = category.id;
      categorySpan.className = "name";
      categorySpan.innerText = category.name;
      attr.value = category.img;
      categoryImg.setAttributeNode(attr);
      categoryDiv.append(categoryImg, categorySpan);
      headerCategory.appendChild(categoryDiv);

      categoryDiv.addEventListener("mouseenter", () => {
        // 카테고리 요소에 마우스를 올렸을 때 실행되는 함수
        subCategoryGnb.classList.add("active");
        // 서브 카테고리를 담는 요소에 'active' 클래스를 추가하여 보이도록 함
        showSubCategories(category.subdata);
        // 현재 카테고리의 서브 카테고리를 표시하는 함수 호출
      });

      categoryBtn.addEventListener("mouseleave", () => {
        // 카테고리 요소에서 마우스를 뗐을 때 실행되는 함수
        subCategoryGnb.classList.remove("active");
        // 서브 카테고리를 담는 요소에서 'active' 클래스를 제거하여 숨기도록 함
      });
    };
    const showSubCategories = (subCategories) => {
      // 서브 카테고리를 표시하는 함수
      subCategoryGnb.innerHTML = "";
      // 기존에 표시된 서브 카테고리들을 모두 제거
      subCategories.forEach((sub) => {
        // 각 서브 카테고리에 대해 반복 실행
        const a = document.createElement("a");
        a.href = `./search.html`;

        const subDiv = document.createElement("div");
        // 새로운 div 요소를 생성
        subDiv.className = "sub-category-item";
        // 생성한 div 요소에 클래스 이름을 'sub-category-item'으로 설정
        subDiv.innerText = sub.name;
        a.appendChild(subDiv);
        // 생성한 div 요소의 텍스트를 서브 카테고리의 이름으로 설정
        subCategoryGnb.appendChild(a);
        // 생성한 div 요소를 서브 카테고리 요소에 추가
      });
    };
    const importData = () => {
      categorys.data.map((category) => {
        createItem(category);
      });
    };
    importData();
  })
  .catch((error) => {
    console.log(error);
  });

const mobileClose = document.querySelector(".mobileClose");
mobileClose.addEventListener("click", () => {
  window.history.back();
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
    const left = document.querySelectorAll(".left > ul > li");
    left.forEach((item, i) => {
      item.innerHTML = `<li>${categorys.data[i].name}</li>`;
    });
    const right = document.querySelector(".right");

    categorys.data.forEach((category) => {
      // 각 카테고리의 이름을 제목으로 추가
      const categoryImg = document.createElement("img");
      categoryImg.src = category.img;
      const categoryTitle = document.createElement("span");
      categoryTitle.textContent = category.name;
      const titleWrap = document.createElement("div");
      titleWrap.appendChild(categoryImg);
      titleWrap.appendChild(categoryTitle);
      right.appendChild(titleWrap);

      // 각 카테고리의 서브 데이터를 리스트로 추가
      let ulElement = document.createElement("ul"); // 각 카테고리별로 ul 요소 생성

      category.subdata.forEach((sub) => {
        let liElement = document.createElement("li");
        let aElement = document.createElement("a");
        aElement.href = "./search.html";
        aElement.textContent = sub.name;

        liElement.appendChild(aElement);
        ulElement.appendChild(liElement);
      });

      // 최종적으로 카테고리별로 생성된 ul 요소를 .right 요소에 추가
      right.appendChild(ulElement);
    });
    const leftItems = document.querySelectorAll(".left > ul > li");
    const leftContainer = document.querySelector(".left");
    // 각 카테고리의 시작 위치를 저장할 배열을 만듭니다.
    const categoryPositions = [];

    categorys.data.forEach((category, index) => {
      const categoryElement = right.children[index * 2]; // 이미지와 제목이 있는 div 요소
      categoryPositions.push({
        top: categoryElement.offsetTop,
        bottom: categoryElement.offsetTop + categoryElement.offsetHeight,
        leftItem: leftItems[index],
      });
    });

    // 스크롤 이벤트 리스너 추가
    right.addEventListener("scroll", () => {
      const scrollPosition = right.scrollTop;
      const scrollBottom = scrollPosition + right.clientHeight; // 현재 스크롤 위치 + 화면에 보이는 영역 높이

      categoryPositions.forEach(({ top, bottom, leftItem }, index) => {
        const isLastCategory = index === categoryPositions.length - 1;

        if (
          (scrollPosition >= top && scrollPosition < bottom) ||
          (isLastCategory && scrollBottom >= right.scrollHeight)
        ) {
          // 현재 카테고리가 보일 때 또는 마지막 카테고리가 보일 때
          leftItems.forEach((item) => {
            item.style.backgroundColor = "";
            item.style.color = "";
            item.style.fontWeight = "";
          }); // 모든 아이템의 색상을 초기화
          leftItem.style.backgroundColor = "#fff";
          leftItem.style.color = "#5f0080";
          leftItem.style.fontWeight = "600";

          const itemOffsetTop = leftItem.offsetTop;
          const containerHeight = leftContainer.clientHeight;
          const itemHeight = leftItem.clientHeight;

          leftContainer.scrollTop =
            itemOffsetTop - containerHeight / 2 + itemHeight / 2;
        }
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });

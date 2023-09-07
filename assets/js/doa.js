class DoaHarian {
  constructor() {
    this.apiUrl = `https://islamic-api-zhirrr.vercel.app/api/doaharian`;
    this.fetchData();
  }

  async fetchData() {
    try {
      const response = await fetch(this.apiUrl);
      const data = await response.json();
      this.dataApi = data.data;
      this.renderView();
      this.setupSearch();
      this.setKeyboardAction();
    } catch (error) {
      window.location.href = "error.html";
      console.error(error);
    }
  }

  renderView() {
    let counter = 1;
    this.dataApi.forEach((item) => {
      const { title, arabic, latin, translation } = item;

      const daftarDoaContainer = document.getElementById("daftar-doa");
      const accordionContainer = document.createElement("div");
      accordionContainer.classList.add(
        "accordion",
        "border",
        "border-dark",
        "mb-3",
        "item"
      );
      daftarDoaContainer.appendChild(accordionContainer);

      const accordionItem = document.createElement("div");
      accordionItem.classList.add("accordion-item");
      accordionContainer.appendChild(accordionItem);

      const accordionHeader = document.createElement("h2");
      accordionHeader.classList.add("accordion-header");
      accordionItem.appendChild(accordionHeader);

      const accordionButton = document.createElement("button");
      accordionButton.classList.add(
        "accordion-button",
        "collapsed",
        "fw-bold",
        "title"
      );
      accordionButton.type = "button";
      accordionButton.setAttribute("data-bs-toggle", "collapse");
      accordionButton.setAttribute("data-bs-target", `#panel${counter}`);
      accordionButton.innerHTML = `<article>${counter}. ${title}</article>`;
      accordionHeader.appendChild(accordionButton);

      const accordionCollapse = document.createElement("div");
      accordionCollapse.id = `panel${counter}`;
      accordionCollapse.classList.add("accordion-collapse", "collapse");
      accordionItem.appendChild(accordionCollapse);

      const span1 = document.createElement("span");
      span1.className = "text-end d-flex justify-content-end mb-2 fs-4 fw-bold";
      span1.innerHTML = `${arabic} <br>`;
      span1.style.fontFamily = "'Amiri', serif";

      const span2 = document.createElement("span");
      span2.className =
        "text-end d-flex justify-content-end mb-2 text-warning fw-bold";
      span2.innerHTML = `${latin} <br>`;
      span2.style.fontStyle = "italic";

      const span3 = document.createElement("span");
      span3.className = "text-start";
      span3.innerHTML = `${translation}`;

      const accordionBody = document.createElement("div");
      accordionBody.classList.add("accordion-body");
      accordionBody.appendChild(span1);
      accordionBody.appendChild(span2);
      accordionBody.appendChild(span3);
      accordionCollapse.appendChild(accordionBody);

      accordionButton.addEventListener("click", function () {
        accordionButton.classList.toggle("show");
      });

      counter++;
    });
  }

  setupSearch() {
    const inputElement = document.getElementById("search");
    const list = document.getElementById("daftar-doa");
    const menuList = list.getElementsByTagName("article");
    const items = list.getElementsByClassName("item");

    inputElement.addEventListener("input", function () {
      const searchText = inputElement.value.toLowerCase();
      let i = 0;
      for (const menuItem of menuList) {
        const menuItemText = menuItem.textContent.toLowerCase();
        if (menuItemText.includes(searchText)) {
          menuItem.style.display = "block";
          items[i].style.display = "block";
          i++;
        } else {
          menuItem.style.display = "none";
          items[i].style.display = "none";
          i++;
        }
      }
    });

    return inputElement;
  }

  setKeyboardAction() {
    document.addEventListener("keydown", (event) => {
      if (event.shiftKey && event.key === "Enter") {
        this.setupSearch().focus();
      }
    });
  }
}

const DoaHarianObject = new DoaHarian();
DoaHarianObject.renderView();

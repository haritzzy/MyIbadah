class AsmaulHusna {
  constructor() {
    this.apiUrl = `https://asmaul-husna-api.vercel.app/api/all`;
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
    const list = document.getElementById("daftar");
    this.dataApi.forEach((item) => {
      const { urutan, latin, arab, arti } = item;

      const div = document.createElement("div");
      div.className = "px-3 py-2 border border-2 rounded border-dark width-1";
      div.style.fontFamily = "sans-serif";
      div.style.cursor = "pointer";

      const h3 = document.createElement("h3");
      h3.className = "number";
      h3.textContent = `${urutan}.`;

      const h4 = document.createElement("h4");
      h4.className = "nama text-end fs-6";
      h4.style.fontFamily = "'Amiri', serif";
      h4.textContent = arab;

      const h6 = document.createElement("h6");
      h6.className = "namaLatin fs-2 mb-0";
      h6.textContent = latin;

      const span = document.createElement("span");
      span.className = "arti text-center";
      span.textContent = arti;

      div.appendChild(h3);
      div.appendChild(h4);
      div.appendChild(h6);
      div.appendChild(span);

      list.appendChild(div);
    });
  }

  setupSearch() {
    const inputElement = document.getElementById("search");
    const list = document.getElementById("daftar");
    const menuList = list.getElementsByTagName("div");

    inputElement.addEventListener("input", function () {
      const searchText = inputElement.value.toLowerCase();
      for (const menuItem of menuList) {
        const menuItemText = menuItem.textContent.toLowerCase();
        if (menuItemText.includes(searchText)) {
          menuItem.style.display = "block";
        } else {
          menuItem.style.display = "none";
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

const AsmaulHusnaObject = new AsmaulHusna();
AsmaulHusnaObject.renderView();


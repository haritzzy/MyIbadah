class RegionIndonesia {
  constructor() {
    this.url = "https://api.myquran.com/v1/sholat/kota/semua";
    this.fetchData();
    this.inputElement = document.getElementById("search");
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      const data = await response.json();
      this.renderRegionList(data);
      this.setupSearch();
      this.setKeyboardAction();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  renderRegionList(data) {
    const lokasiCollections = [];
    const idCollections = [];

    for (let i = 0; i < data.length; i++) {
      const idLokasi = data[i]["id"];
      const lokasi = data[i]["lokasi"];
      lokasiCollections.push(lokasi);
      idCollections.push(idLokasi);
    }

    for (let i = 0; i < lokasiCollections.length; i++) {
      const anchor = document.createElement("a");
      anchor.className = "lokasi";
      anchor.href = `list-jadwal.html?idkota=${idCollections[i]}`;
      anchor.style.textDecoration = "none";

      const div = document.createElement("div");
      div.className =
        "px-4 py-5 border d-flex align-items-center width-1 justify-content-center text-center border-2 rounded border-dark fs-1 fw-bold";
      div.style.fontFamily = "sans-serif";
      div.style.height = "7rem";
      div.textContent = lokasiCollections[i];

      anchor.appendChild(div);

      const list = document.getElementById("daftar-wilayah");
      list.appendChild(anchor);
    }
  }

  setupSearch() {
    const list = document.getElementById("daftar-wilayah");
    const inputElement = document.getElementById("search");
    const menuList = list.getElementsByTagName("a");

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

const RegionObject = new RegionIndonesia();
RegionObject.renderRegionList();


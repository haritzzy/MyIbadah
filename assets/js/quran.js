class Quran {
  constructor() {
    this.apiUrl = "https://equran.id/api/v2/surat";
    this.fetchData();
  }

  async fetchData() {
    try {
      const response = await fetch(this.apiUrl);
      const data = await response.json();
      this.dataApi = data.data;
      this.renderListSurah();
      this.setupSearch();
      this.setKeyboardAction();
      this.deleteMark();
    } catch (error) {
      window.location.href = "error.html";
      console.error(error);
    }
  }

  renderListSurah() {
    const list = document.getElementById("daftar-surah");

    this.dataApi.forEach((item) => {
      const { nomor, nama, namaLatin, jumlahAyat, tempatTurun, arti } = item;

      const anchor = document.createElement("a");
      anchor.className = "surah";
      anchor.href = `baca.html?nosurah=${nomor}`;
      anchor.style.textDecoration = "none";

      const div = document.createElement("div");
      div.className = "px-3 py-2 border border-2 rounded border-dark width-1";
      div.style.fontFamily = "sans-serif";

      const span = document.createElement("span");
      span.className = "text-center d-flex justify-content-end ayat";
      const condition = tempatTurun == "Mekah" ? "Makkiyyah" : "Madaniyyah";
      span.textContent = `${tempatTurun} (${condition})`;

      const h3 = document.createElement("h3");
      h3.className = "number";
      h3.textContent = `${nomor}. ${namaLatin}`;

      const h4 = document.createElement("h4");
      h4.className = "nama text-end";
      h4.style.fontFamily = "sans-serif";
      h4.textContent = nama;

      const h6 = document.createElement("h6");
      h6.className = "arti";
      h6.textContent = arti;

      const span2 = document.createElement("span");
      span2.className = "jumlah";
      span2.textContent = `Jumlah ayat: ${jumlahAyat}`;

      anchor.appendChild(div);
      div.appendChild(span);
      div.appendChild(h3);
      div.appendChild(h4);
      div.appendChild(h6);
      div.appendChild(span2);

      list.appendChild(anchor);
    });
  }

  setupSearch() {
    const inputElement = document.getElementById("search");
    const list = document.getElementById("daftar-surah");
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

  deleteMark() {
    const inputString = localStorage.getItem("mark");
    const noSurah = localStorage.getItem("noSurah");

    const deleteMark = document.getElementById("delete");
    if (
      inputString == "null" ||
      (inputString == undefined && noSurah == "null") ||
      noSurah == undefined
    ) {
      deleteMark.style.display = "none";
    } else {
      deleteMark.style.display = "inline";
      const cleanedString = inputString.replace(/-\d+$/, "");
      const ayatNumber = inputString.match(/\d+/)[0];

      const formattedString = `${cleanedString
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("-")} ayat ${ayatNumber}`;

      const mark = document.getElementById("mark");
      const anchorSurah = document.createElement("a");

      anchorSurah.className = "text-primary";
      anchorSurah.href = `baca.html?nosurah=${noSurah}`;
      anchorSurah.textContent = formattedString;
      mark.textContent = "Terakhir dibaca: ";
      mark.appendChild(anchorSurah);
    }

    deleteMark.addEventListener("click", function () {
      localStorage.setItem("noSurah", null);
      localStorage.setItem("mark", null);
      window.location.reload();
    });
  }
}

const QuranObject = new Quran();
QuranObject.renderListSurah();


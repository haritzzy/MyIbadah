const apiUrl = "https://asmaul-husna-api.vercel.app/api/all";

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {

    //   console.log(data);
      const list = document.getElementById('daftar')
      data.data.forEach((item) => {
      const { urutan, latin, arab, arti } = item;

      const div = document.createElement("div");
      div.className = "px-3 py-2 border border-2 rounded border-dark width-1";
      div.style.fontFamily = "sans-serif";

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
  });

const inputElement = document.getElementById("search");
document.addEventListener("keydown", (event) => {
  if (event.shiftKey && event.key === "Enter") {
    inputElement.focus();
  }
});

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
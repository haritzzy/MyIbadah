const apiUrl = `https://api.myquran.com/v1/sholat/kota/semua`;

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const lokasiArray = [];
    const idLokasiArray = [];
    for (let i = 0; i < data.length; i++) {
      const idLokasi = data[i]["id"];
      const lokasi = data[i]["lokasi"];
      lokasiArray.push(lokasi);
      idLokasiArray.push(idLokasi);
    }

    for (let i = 0; i < lokasiArray.length; i++) {
      const anchor = document.createElement("a");
      anchor.className = "lokasi";
      anchor.href = `list-jadwal.html?${idLokasiArray[i]}`;
      anchor.style.textDecoration = "none";

      const div = document.createElement("div");
      div.className =
        "px-4 py-5 border d-flex align-items-center width-1 justify-content-center text-center border-2 rounded border-dark fs-1 fw-bold";
      div.style.fontFamily = "sans-serif";
      div.style.height = "7rem";
      div.textContent = lokasiArray[i];

      anchor.appendChild(div);

      const list = document.getElementById("daftar-jadwal");
      list.appendChild(anchor);
    }
  });

const inputElement = document.getElementById("search");
document.addEventListener("keydown", (event) => {
  if (event.shiftKey && event.key === "Enter") {
    inputElement.focus();
  }
});

const list = document.getElementById('daftar-jadwal');
const menuList = list.getElementsByTagName('a');

inputElement.addEventListener('input', function (){
  const searchText = inputElement.value.toLowerCase();
  for(const menuItem of menuList){
    const menuItemText = menuItem.textContent.toLowerCase();
    if(menuItemText.includes(searchText)){
      menuItem.style.display = "block";
    }else{
      menuItem.style.display = "none";
    }
  }
});



const apiUrl = `https://api.myquran.com/v1/sholat/kota/semua`;

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const lokasiArray = [];
    for (let i = 0; i < data.length; i++) {
      const lokasi = data[i]["lokasi"];
      lokasiArray.push(lokasi);
    }

    for (let i = 0; i < lokasiArray.length; i++) {
      const anchor = document.createElement("a");
      anchor.className = "lokasi";
      anchor.href = "";
      anchor.style.textDecoration = "none";

      const div = document.createElement("div");
      div.className =
        "px-3 py-5 border d-flex align-items-center width-1 justify-content-center text-center border-2 rounded border-dark fs-1 fw-bold";
      div.style.fontFamily = "sans-serif";
      div.style.height = "7rem";
      div.textContent = lokasiArray[i];

      anchor.appendChild(div);

      const list = document.getElementById("daftar-jadwal");
      list.appendChild(anchor);
    }
  });

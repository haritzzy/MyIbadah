const url = window.location.href;
const segments = url.split("?");
if (segments.length > 1) {
  const idKota = segments[1];
  const currentDate = new Date();
  const apiUrl = `https://api.myquran.com/v1/sholat/jadwal/${idKota}/${currentDate.getFullYear()}/${
    currentDate.getMonth() + 1
  }`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const parentData = data.data;
      const monthIndex = currentDate.getMonth();
      const monthsInIndonesian = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      const lokasi = document.getElementById("lokasi");
      const zona = document.getElementById("zona");

      lokasi.innerHTML = parentData.lokasi;
      zona.innerHTML = `PROVINSI ${
        parentData.daerah
      }, ${currentDate.getDate()} ${monthsInIndonesian[
        monthIndex
      ].toUpperCase()} ${currentDate.getFullYear()}`;

      const tbody = document.querySelector("tbody");

      for (const value in parentData.jadwal) {
        const tr = document.createElement("tr");

        const fields = [
          "tanggal",
          "imsak",
          "subuh",
          "terbit",
          "dhuha",
          "dzuhur",
          "ashar",
          "maghrib",
          "isya",
        ];

        fields.forEach((field) => {
          const td = document.createElement("td");
          td.className = field;
          td.textContent = parentData.jadwal[value][field];
          tr.appendChild(td);
        });

        tbody.appendChild(tr);
      }
      
    })
    .catch(function () {
      window.location.href = "error.html";
    });
} else {
  window.location.href = "error.html";
}

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
        const tdTanggal = document.createElement("td");
        const tdImsak = document.createElement("td");
        const tdSubuh = document.createElement("td");
        const tdTerbit = document.createElement("td");
        const tdDhuha = document.createElement("td");
        const tdDzuhur = document.createElement("td");
        const tdAshar = document.createElement("td");
        const tdMaghrib = document.createElement("td");
        const tdIsya = document.createElement("td");

        tdTanggal.className = "tanggal";
        tdTanggal.textContent = parentData.jadwal[value]["tanggal"];
        tdImsak.className = "imsak";
        tdImsak.textContent = parentData.jadwal[value]["imsak"];
        tdSubuh.className = "subuh";
        tdSubuh.textContent = parentData.jadwal[value]["subuh"];
        tdTerbit.className = "terbit";
        tdTerbit.textContent = parentData.jadwal[value]["terbit"];
        tdDhuha.className = "dhuha";
        tdDhuha.textContent = parentData.jadwal[value]["dhuha"];
        tdDzuhur.className = "dzuhur";
        tdDzuhur.textContent = parentData.jadwal[value]["dzuhur"];
        tdAshar.className = "ashar";
        tdAshar.textContent = parentData.jadwal[value]["ashar"];
        tdMaghrib.className = "maghrib";
        tdMaghrib.textContent = parentData.jadwal[value]["maghrib"];
        tdIsya.className = "isya";
        tdIsya.textContent = parentData.jadwal[value]["isya"];

        tbody.appendChild(tr);
        tr.appendChild(tdTanggal);
        tr.appendChild(tdImsak);
        tr.appendChild(tdSubuh);
        tr.appendChild(tdTerbit);
        tr.appendChild(tdDhuha);
        tr.appendChild(tdDzuhur);
        tr.appendChild(tdAshar);
        tr.appendChild(tdMaghrib);
        tr.appendChild(tdIsya);
      }
    })
    .catch(function () {
      window.location.href = "error.html";
    });
} else {
  window.location.href = "error.html";
}


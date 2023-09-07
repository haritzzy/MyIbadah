class Schedule {
  constructor() {
    this.url = window.location.href;
    this.segments = this.url.split("?idkota=");
    this.currentDate = new Date();
    this.checkUrl(),
    this.months = [
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
    this.fields = [
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
  }

  async fetchData(apiUrl) {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      this.renderSchedule(data.data);
    } catch (error) {
      window.location.href = "error.html";
      console.error(error);
    }
  }

  checkUrl() {
    if (this.segments.length > 1) {
      const idKota = this.segments[1];
      const apiUrl = `https://api.myquran.com/v1/sholat/jadwal/${idKota}/${this.currentDate.getFullYear()}/${
        this.currentDate.getMonth() + 1
      }`;
      this.fetchData(apiUrl);
    } else {
      window.location.href = "error.html";
    }
  }

  renderSchedule(data) {
    const monthIndex = this.currentDate.getMonth();
    const lokasi = document.getElementById("lokasi");
    const zona = document.getElementById("zona");

    lokasi.innerHTML = data.lokasi;
    zona.innerHTML = `PROVINSI ${
      data.daerah
    }, ${this.currentDate.getDate()} ${this.months[
      monthIndex
    ].toUpperCase()} ${this.currentDate.getFullYear()}`;

    const tbody = document.querySelector("tbody");

    for (const value in data.jadwal) {
      const tr = document.createElement("tr");

      this.fields.forEach((field) => {
        const td = document.createElement("td");

        td.className = field;
        td.textContent = data.jadwal[value][field];
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    }
  }
}

const ScheduleObject = new Schedule();
ScheduleObject.renderSchedule();

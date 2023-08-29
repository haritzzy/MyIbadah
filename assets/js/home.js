class Greetings {
  constructor() {
    this.element = document.getElementById("greetings");
    this.currentHour = new Date().getHours();
  }

  setGreetings() {
    if (this.currentHour >= 5 && this.currentHour < 11)
      return (this.element.textContent = "Selamat Pagi");
    if (this.currentHour >= 11 && this.currentHour < 15)
      return (this.element.textContent = "Selamat Siang");
    if (this.currentHour >= 15 && this.currentHour < 18)
      return (this.element.textContent = "Selamat Sore");
    return (this.element.textContent = "Selamat Malam");
  }
}

class Calendar {
  constructor() {
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
    this.elementDate = document.getElementById("waktu");
  }

  setCalendar() {
    setInterval(() => {
      const currentTime = new Date();
      this.elementDate.innerHTML = `${currentTime.getDate()} ${
        this.months[currentTime.getMonth()]
      } ${currentTime.getFullYear()}, ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
    });
  }
}



new Greetings().setGreetings();
new Calendar().setCalendar();

const greetings = document.getElementById("greetings");
const currentHour = new Date().getHours();

if (currentHour >= 5 && currentHour < 11) {
  greetings.textContent = "Selamat Pagi";
} else if (currentHour >= 11 && currentHour < 15) {
  greetings.textContent = "Selamat Siang";
} else if (currentHour >= 15 && currentHour < 18) {
  greetings.textContent = "Selamat Sore";
} else {
  greetings.textContent = "Selamat Malam";
}

const displayDate = document.getElementById("waktu");
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

setInterval(function () {
  const currentTime = new Date();
  displayDate.innerHTML = `${currentTime.getDate()} ${
    monthsInIndonesian[currentTime.getMonth()]
  } ${currentTime.getFullYear()}, ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
}, 1000);

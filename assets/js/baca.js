const url = window.location.href;
const segments = url.split("?nosurah=");

if (segments.length > 1) {
  const noSurah = segments[1];
  const apiUrl = `https://equran.id/api/v2/surat/${noSurah}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const parentData = data.data;
      const condition =
        parentData.tempatTurun == "Mekah" ? "Makkiyyah" : "Madaniyyah";
      const nameSurahArab = document.getElementById("nama-surah-arab");
      const nameSurah = document.getElementById("nama-surah");
      const infoSurah = document.getElementById("info-surah");

      nameSurahArab.textContent = data.data.nama;
      nameSurah.textContent = data.data.namaLatin;
      infoSurah.textContent = `${parentData.arti}. Surah ke-${parentData.nomor}. ${condition}`;

      const previous = document.getElementById("sebelumnya");
      previous.setAttribute(
        "href",
        `baca.html?nosurah=${parentData.suratSebelumnya.nomor}`
      );

      const next = document.querySelectorAll(".selanjutnya");
      next.forEach((element) => {
        element.setAttribute(
          "href",
          `baca.html?nosurah=${parentData.suratSelanjutnya.nomor}`
        );
        if (parentData.suratSelanjutnya.nomor == undefined) {
          element.setAttribute("style", "display: none");
        } else if (parentData.suratSebelumnya.nomor == undefined) {
          previous.setAttribute("style", "display: none");
        }
      });

      const getQori = document.getElementById("pilih-qori");
      let getValue = ``;
      getQori.addEventListener("input", function () {
        getValue = getQori.value;
        updateAudioUrl(getValue);
        localStorage.setItem("qori", getValue);
        window.location.reload();
      });

      function updateAudioUrl(getValue) {
        let formattedNoSurah = "";

        if (noSurah < 10) {
          formattedNoSurah = "00" + noSurah;
        } else if (noSurah >= 10 && noSurah < 100) {
          formattedNoSurah = "0" + noSurah;
        } else if (noSurah >= 100) {
          formattedNoSurah = noSurah;
        }

        const audioUrl = `https://equran.nos.wjv-1.neo.id/audio-full/${getValue}/${formattedNoSurah}.mp3`;
        const audioUrlPerAyat = `https://equran.nos.wjv-1.neo.id/audio-partial/${getValue}/${formattedNoSurah}`;

        const audioControl = document.getElementById("audio-control");
        const audioUtamaQori = document.getElementById("audio-qori");
        audioUtamaQori.setAttribute("src", audioUrl);
        audioControl.load();

        return `${audioUrlPerAyat}`;
      }

      const surah = document.getElementById("surah");

      parentData.ayat.forEach((ayatData) => {
        let formattedNoAyat = "";
        if (ayatData.nomorAyat < 10) {
          formattedNoAyat = "00" + ayatData.nomorAyat;
        } else if (ayatData.nomorAyat >= 10 && ayatData.nomorAyat < 100) {
          formattedNoAyat = "0" + ayatData.nomorAyat;
        } else if (ayatData.nomorAyat >= 100) {
          formattedNoAyat = ayatData.nomorAyat;
        }

        surah.innerHTML += `<div class="mt-5">
        <div class="float-start text-start">
            <div class="bg-warning fs-1 fw-bold text-white d-flex justify-content-center align-items-center nomor rounded-circle mb-3"
                id="${parentData.namaLatin.toLowerCase()}-${
          ayatData.nomorAyat
        }" style="width: 45px; height: 45px;">
                ${ayatData.nomorAyat}
            </div>
        </div>
        <div class="float-end fw-bold fs-5 arab text-end"
            style="font-family: 'Amiri', serif; line-height: 4.5rem; letter-spacing: 1px;">
            ${ayatData.teksArab}
        </div>
        <br><br>
        <div class="mt-4 mb-4 latin text-warning text-end fw-bold" style="font-style: italic;">${
          ayatData.teksLatin
        }</div>
        <div class="mt-4 mb-1 terjemahan">${ayatData.teksIndonesia}</div>
        <div class="mt-2 mb-4 d-flex justify-content-start audio"><audio class="audioAyat" controls="">
                <source src="${updateAudioUrl(
                  localStorage.getItem("qori")
                )}${formattedNoAyat}.mp3">
            </audio></div>
        <div class="d-flex justify-content-end"><button class="btn btn-sm btn-outline-warning buttonMark" id="${ayatData.nomorAyat}"
                data-surah="${parentData.namaLatin.toLowerCase()}-${
          ayatData.nomorAyat
        }">Tandai ayat</button></div>
        <hr class="border-warning border border-top-2">
    </div>`;
      });

      const markButtons = document.querySelectorAll(".buttonMark");

      markButtons.forEach((markButton) => {
        markButton.addEventListener("click", () => {
          const dataSurah = markButton.getAttribute("data-surah");

          const url = new URL(window.location.href);
          url.hash = "";

          const queryString = url.searchParams.get("nosurah");

          if (queryString) {
            localStorage.setItem("mark", dataSurah);
            localStorage.setItem("noSurah", queryString);

            Swal.fire({
              title: "Sukses tersimpan",
              html: `Data surah <b>${
                parentData.namaLatin
              }</b> ayat <b>${markButton.getAttribute(
                "id"
              )}</b> berhasil ditandai`,
              icon: "success",
              confirmButtonText: "Oke",
            });
          } else {
            window.location.href = "error.html";
          }
        });
      });

      const selectQori = document.getElementById("select");
      selectQori.textContent = localStorage.getItem("qori")
        ? localStorage.getItem("qori")
        : "Pilih Qori'";

      const audioUtama = document.getElementById("audio-utama");
      const audio = document.getElementById("audio");
      const audioClass = document.querySelectorAll(".audio");

      const isAudioHidden = localStorage.getItem("audioHidden");
      if (isAudioHidden === "true") {
        audioClass.forEach(function (element) {
          audioUtama.classList.add("d-none");
          element.classList.add("d-none");
        });
      }

      audio.addEventListener("click", function () {
        audioClass.forEach(function (element) {
          audioUtama.classList.toggle("d-none");
          element.classList.toggle("d-none");
        });

        const shouldHide = audioClass[0].classList.contains("d-none");
        localStorage.setItem("audioHidden", shouldHide.toString());
      });

      const latin = document.getElementById("latin");
      const latinClass = document.querySelectorAll(".latin");

      const isLatinHidden = localStorage.getItem("latinHidden");
      if (isLatinHidden === "true") {
        latinClass.forEach(function (element) {
          element.classList.add("d-none");
        });
      }

      latin.addEventListener("click", function () {
        latinClass.forEach(function (element) {
          element.classList.toggle("d-none");
        });

        const shouldHide = latinClass[0].classList.contains("d-none");
        localStorage.setItem("latinHidden", shouldHide.toString());
      });

      const tafsir = document.getElementById("tafsir");
      tafsir.addEventListener("click", function () {
        Swal.fire({
          title: `Tafsir surah ${parentData.namaLatin}`,
          html: `<div class="text-justify">${parentData.deskripsi}</div>`,
          confirmButtonText: "Oke",
          customClass: {
            content: "scrollable-swal-content",
          },
        });
      });

      if (url.includes(`#${localStorage.getItem("mark")}`)) {
        window.location.href;
      } else {
        if (noSurah !== localStorage.getItem("noSurah")) {
          window.location.href;
        } else {
          window.location.href = `${url}#${localStorage.getItem("mark")}`;
        }
      }
    })
    .catch(function () {
      window.location.href = "error.html";
    });
} else {
  window.location.href = "error.html";
}

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
        const div1 = document.createElement("div");
        div1.className = "mt-5";

        const div2 = document.createElement("div");
        div2.className = "float-start text-start";

        const div3 = document.createElement("div");
        div3.className =
          "bg-warning fs-1 fw-bold text-white d-flex justify-content-center align-items-center nomor rounded-circle mb-3";
        div3.id = `${parentData.namaLatin.toLowerCase()}-${ayatData.nomorAyat}`;
        div3.style.width = "45px";
        div3.style.height = "45px";
        div3.textContent = ayatData.nomorAyat;

        const div4 = document.createElement("div");
        div4.className = "float-end fw-bold fs-5 arab text-end";
        div4.style.fontFamily = "'Amiri', serif";
        div4.style.lineHeight = "4.5rem";
        div4.style.letterSpacing = "1px";
        div4.textContent = ayatData.teksArab;

        const div5 = document.createElement("div");
        div5.className = "mt-4 mb-4 latin text-warning text-end fw-bold";
        div5.style.fontStyle = "italic";
        div5.textContent = ayatData.teksLatin;

        const div6 = document.createElement("div");
        div6.className = "mt-4 mb-1 terjemahan";
        div6.textContent = ayatData.teksIndonesia;

        const divAudio = document.createElement("div");
        divAudio.className = "mt-2 mb-4 d-flex justify-content-start audio";

        const audioAyat = document.createElement("audio");
        audioAyat.className = "audioAyat";
        audioAyat.setAttribute("controls", "");
        audioAyat.load();

        let formattedNoAyat = "";
        if (ayatData.nomorAyat < 10) {
          formattedNoAyat = "00" + ayatData.nomorAyat;
        } else if (ayatData.nomorAyat >= 10 && ayatData.nomorAyat < 100) {
          formattedNoAyat = "0" + ayatData.nomorAyat;
        } else if (ayatData.nomorAyat >= 100) {
          formattedNoAyat = ayatData.nomorAyat;
        }

        const audioSource = document.createElement("source");
        audioSource.src = `${updateAudioUrl(
          localStorage.getItem("qori")
        )}${formattedNoAyat}.mp3`;

        const div7 = document.createElement("div");
        div7.className = "d-flex justify-content-end";

        const button = document.createElement("button");
        button.className = "btn btn-sm btn-outline-warning buttonMark";
        button.id = ayatData.nomorAyat;
        button.textContent = "Tandai ayat";
        button.setAttribute(
          "data-surah",
          `${parentData.namaLatin.toLowerCase()}-${ayatData.nomorAyat}`
        );

        const br1 = document.createElement("br");
        const br2 = document.createElement("br");

        const hr = document.createElement("hr");
        hr.className = "border-warning border border-top-2";

        div2.appendChild(div3);
        div1.appendChild(div2);
        div1.appendChild(div4);
        div1.appendChild(br1);
        div1.appendChild(br2);
        div1.appendChild(div5);
        div1.appendChild(div6);
        audioAyat.appendChild(audioSource);
        divAudio.appendChild(audioAyat);
        div1.appendChild(divAudio);
        div7.appendChild(button);
        div1.appendChild(div7);
        div1.appendChild(hr);
        surah.appendChild(div1);
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

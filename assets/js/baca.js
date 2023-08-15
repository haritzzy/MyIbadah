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

      const surah = document.getElementById("surah");
      for (let i = 0; i < parentData.ayat.length; i++) {
        const div1 = document.createElement("div");
        div1.className = "mt-5";

        const div2 = document.createElement("div");
        div2.className = "float-start text-start";

        const div3 = document.createElement("div");
        div3.className =
          "bg-warning fs-1 fw-bold text-white d-flex justify-content-center align-items-center nomor rounded-circle mb-3";
        div3.id = `${parentData.namaLatin.toLowerCase()}-${
          parentData.ayat[i]["nomorAyat"]
        }`;
        div3.style.width = "45px";
        div3.style.height = "45px";
        div3.textContent = `${parentData.ayat[i]["nomorAyat"]}`;

        const div4 = document.createElement("div");
        div4.className = "float-end fw-bold fs-5 arab text-end";
        div4.style.fontFamily = "'Amiri', serif";
        div4.style.lineHeight = "4.5rem";
        div4.style.letterSpacing = "1px";
        div4.textContent = parentData.ayat[i]["teksArab"];

        const div5 = document.createElement("div");
        div5.className = "mt-4 mb-4 latin text-warning text-end fw-bold";
        div5.style.fontStyle = "italic";
        div5.textContent = parentData.ayat[i]["teksLatin"];

        const div6 = document.createElement("div");
        div6.className = "mt-4 mb-1 terjemahan";
        div6.textContent = parentData.ayat[i]["teksIndonesia"];

        const div7 = document.createElement("div");
        div7.className = "d-flex justify-content-end";

        const button = document.createElement("button");
        button.className = "btn btn-sm btn-outline-warning buttonMark";
        button.id = parentData.ayat[i]["nomorAyat"];
        button.textContent = "Tandai ayat";
        button.setAttribute(
          "data-surah",
          `${parentData.namaLatin.toLowerCase()}-${
            parentData.ayat[i]["nomorAyat"]
          }`
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
        div7.appendChild(button);
        div1.appendChild(div7);
        div1.appendChild(hr);
        surah.appendChild(div1);
      }

      const markButton = document.querySelectorAll(".buttonMark");
      markButton.forEach(function (mButton) {
        mButton.addEventListener("click", function () {
          const dataSurah = mButton.getAttribute("data-surah");

          let url = window.location.href;
          let hashIndex = url.indexOf("#");

          if (hashIndex !== -1) {
            url = url.substring(0, hashIndex);
          }

          let queryStringStart = url.indexOf("?");

          if (queryStringStart !== -1) {
            let queryString = url.slice(queryStringStart + 1);
            let params = new URLSearchParams(queryString);
            let nosurahValue = params.get("nosurah");

            if (nosurahValue !== null) {
              localStorage.setItem("mark", dataSurah);
              localStorage.removeItem("noSurah");
              localStorage.setItem("noSurah", nosurahValue);
            }

            Swal.fire({
              title: "Sukses tersimpan",
              html: `Data surah <b>${parentData.namaLatin}</b> ayat <b>${mButton.getAttribute('id')}</b> berhasil ditandai`,
              icon: "success",
              confirmButtonText: "Oke",
            });
          } else {
            window.location.href = "error.html";
          }
        });
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

      const tafsir = document.getElementById('tafsir');
      tafsir.addEventListener('click', function (){
        Swal.fire({
          title: `Tafsir surah ${parentData.namaLatin}`,
          html: `<div class="text-justify">${parentData.deskripsi}</div>`,
          confirmButtonText: "Oke",
          customClass: {
            content: "scrollable-swal-content"
          }
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
